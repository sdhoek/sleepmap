import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { ActivatedRoute } from '@angular/router';
import { CityLocations } from './city-locations.data';
import { CameraService } from '../shared/camera.service';
import { RoutingService } from '../shared/routing.service';
import { Subscription } from 'rxjs/Subscription';
import { WebcamImage } from 'ngx-webcam';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: L.Map;
  private kaart: L.TileLayer;
  private cameraLayer: L.GeoJSON;
  private noCameraRouteLayer: L.GeoJSON;
  private cameraRouteLayer: L.GeoJSON;
  private viewShedLayer: L.GeoJSON;
  private intersectionLayer: L.GeoJSON;
  private cityOutlineLayer: L.GeoJSON;
  private vanLayer: L.GeoJSON;
  private naarLayer: L.GeoJSON;
  public routeData: any;

  public selectionState = 'from';

  public sidebarActive = false;

  private city: string;
  private cityLocations = CityLocations;
  private cityOutlines: any;

  public vanSubscription : Subscription;
  public naarSubscription : Subscription;
  public routeSubscription: Subscription;
  public arParams: Subscription;

  private vannaar = true;

  public showWebcam = true;


  constructor(private route: ActivatedRoute, private cameraService: CameraService, private routingService: RoutingService, private ar: ActivatedRoute) {
    this.city = this.route.snapshot.params.city;
    this.cityOutlines = this.cameraService.getCityOutlines();
  }

  ngOnInit() {

  }

  private toggleFromToState(){
    if (this.selectionState === 'from') {
      this.selectionState = 'to';
    } else {
      this.selectionState = 'from';
    }
    console.log(this.selectionState);
  }
  ngAfterViewInit() {
    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === this.city).location;
    const maxBounds = this.cityLocations.find(cityLoc => cityLoc.name === this.city).mapBounds;
    const example = this.cityLocations.find(cityLoc => cityLoc.name === this.city).example;

    this.map = new L.Map('map', {
      center: [mapCenter.lat, mapCenter.lon],
      maxZoom: 24,
      minZoom: 14,
      zoom: 16,
      zoomControl: false,
      maxBoundsViscosity: 0.5
    });

    this.map.on('click', this.getPoint, this);
    this.map.on('click', this.toggleFromToState, this);
    this.map.setMaxBounds(maxBounds);

    this.map.attributionControl.setPrefix('').setPosition('bottomleft');

    this.kaart = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
      attribution: 'Referentiekaart: <a href="https://www.openstreetmap.org">OpenStreetMap</a>.',
      maxZoom: 24,
      zIndeX: 0
    });

    this.cameraLayer = L.geoJson().addTo(this.map);
    this.noCameraRouteLayer = L.geoJson().addTo(this.map);
    this.cameraRouteLayer = L.geoJson().addTo(this.map);
    this.viewShedLayer = L.geoJson().addTo(this.map);
    this.cityOutlineLayer = L.geoJson().addTo(this.map);
    this.vanLayer = L.geoJson().addTo(this.map);
    this.naarLayer = L.geoJson().addTo(this.map);
    this.intersectionLayer = L.geoJson().addTo(this.map);

    this.drawCityOutline(this.city);

    this.kaart.addTo(this.map);
    // Remove grey bar to the right.
    setTimeout(() => {
      this.map.invalidateSize();
    }, 400);

    const cameras = this.cameraService.getCameras();
    this.drawCameras(cameras);

    const viewsheds = this.cameraService.getCameraViewsheds();
    this.drawViewsheds(viewsheds);

    this.routeSubscription = this.subscribeToRoute();
    this.vanSubscription = this.subscribeToVan();
    this.naarSubscription = this.subscribeToNaar();

    this.arParams = this.ar.params.subscribe((event: any) => {
      this.city = event.city;
    });

    console.log(example);
    console.log(this.city);
    this.routingService.setVan(example.from);
    this.routingService.setNaar(example.to);
    this.routingService.findRoute(this.city);

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.vanSubscription.unsubscribe();
    this.naarSubscription.unsubscribe();
  }
  
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  private getPoint(e) {
    if (this.vannaar) {
      this.routingService.setVan([e.latlng.lng,e.latlng.lat])
    }
    else {
      this.routingService.setNaar([e.latlng.lng,e.latlng.lat]);
     
    }
    this.vannaar = !this.vannaar;
    this.routingService.findRoute(this.city);

  }
  private drawViewsheds(viewsheds) {
    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#fb0000",
      color: "#fb0000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4
    };
    L.geoJson(viewsheds, geojsonMarkerOptions).addTo(this.viewShedLayer);
  }

  public openMenu(event) {
    event.stopPropagation();
    this.sidebarActive = !this.sidebarActive;
  }

  public recenterMap(cityName: string, event) {
    event.stopPropagation();

    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === cityName).location;
    const maxBounds = this.cityLocations.find(cityLoc => cityLoc.name === cityName).mapBounds;

    this.map.setMaxBounds(null);
    const animationDuration = 3; // duration of animation in seconds

    this.map.flyTo([mapCenter.lat, mapCenter.lon], 15, {
        animate: true,
        duration: animationDuration
    })

    setTimeout(()=> {
      this.map.setMaxBounds(maxBounds);
      this.drawCityOutline(cityName);
    }, animationDuration * 1000);
  }

  private drawCityOutline(cityName: string) {
    const invertPolygon = {
      type: 'Polygon',
      coordinates: [
        [[90, -180],
         [90, 180],
         [-90, 180],
         [-90, -180]]
      ]
    }
    const cityOutline = this.cityOutlines.features.find(city => city.properties.naam === cityName);

    invertPolygon.coordinates.push(cityOutline.geometry.coordinates[0]);
    this.cityOutlineLayer.clearLayers();
    this.cityOutlineLayer.addLayer(L.geoJson(invertPolygon, {
      style: {
        color: '#f6be0e',
        fillOpacity: 0.4,
        fillColor: '#f6be0e'
      }
    }));
  }

  private drawCameras(cameras) {
    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#fb0000",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    L.geoJson(cameras, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.cameraLayer);
  }

  private drawNoCameraRouteLayer(routeGeometry) {
    this.noCameraRouteLayer.clearLayers();
    L.geoJson(routeGeometry, {
      style: {
        color: 'green'
      }
    }).addTo(this.noCameraRouteLayer);
    this.map.fitBounds(this.noCameraRouteLayer.getBounds(), {padding: [100, 100]});
  }

  private drawCameraRoute(routeGeometry) {
    this.cameraRouteLayer.clearLayers();
    L.geoJson(routeGeometry, {
      style: {
        color: '#f6be0e',
        dashArray: "5 5",
      }
    }).addTo(this.cameraRouteLayer);
    if(routeGeometry.features.length > 0) {
      this.map.fitBounds(this.cameraRouteLayer.getBounds(), {padding: [100, 100]});
    }
  }

  private filterFaultyPolygons(polygon) {
    let faulty = false;
    if (polygon.coordinates[0].length < 3) {
      faulty = true;
    }
    return faulty;
  }

  private intersectRouteWithViewshed(route, viewsheds) {
    const routebuffer = turf.buffer(route, 0.5, {units: 'meters'});

    let intersections = viewsheds.features.map(viewshed => {
      if (!this.filterFaultyPolygons(viewshed.geometry)) {
        const crosses = turf.booleanCrosses(viewshed, route);

        if (crosses) {
          return turf.intersect(routebuffer.geometry, viewshed.geometry);
        }
      }

    });
    intersections = intersections.filter(inter => inter != null && inter != undefined);
    return {type: 'FeatureCollection', features: intersections};
    // return intersections;
  }

  private drawIntersection(intersectingLines) {
    this.intersectionLayer.clearLayers();
    L.geoJson(intersectingLines, { color: '#f6be0e', width: 10}).addTo(this.intersectionLayer);
  }

  private buildIntersectGeometry(intersectingPoints) {
    const features = intersectingPoints.features;
    const lines = [];
    for (let i = 0; i < features.length; i +=2 ) {
      lines.push({
        type: 'LineString',
        coordinates: [features[i].geometry.coordinates, features[i + 1].geometry.coordinates]
      });
    }
    const fc = {type: 'FeatureCollection', features: lines};
    return fc;
  }

  private subscribeToRoute() {
    return this.routingService.getRoute().subscribe((route: any) => {
      if(route.route=== undefined) {
        return false;
      }
      route.route.geojson.features.forEach(route => {
        route.properties.length = turf.length(route.geometry, {units: 'meters'});
      });
      const fullLine = this.combineLineResponse(route.route.geojson.features);
      this.routeData = route;
      this.drawCameraRoute(route.route.geojson);
      // turf.combine(route.route.geojson);
      if(route.route.geojson.features.length > 0) {
        const intersections = this.intersectRouteWithViewshed(fullLine, this.cameraService.getCameraViewsheds());
        this.drawIntersection(intersections);
        // console.log(intersections);
      }
    });
  }

  private combineLineResponse (lineResponseFeatureCollection) {
    const line = {
      type: 'LineString',
      coordinates: []
    };
    lineResponseFeatureCollection.forEach(responseLine => {
      line.coordinates.push(...responseLine.geometry.coordinates);
      console.log(responseLine);

    })
    // fullLine()
    // lineResponseFeatureCollection
    console.log(line);

    return line;
  }

  private subscribeToVan() {
    return this.routingService.getVan().subscribe(van => {
      this.vanLayer.clearLayers();

      const geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#000",
        color: "#f6be0e",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      };

      L.geoJson(
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": van
          }
        }
        , {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
          }
        }
      ).addTo(this.vanLayer);
    });
  }

  private subscribeToNaar() {
    return this.routingService.getNaar().subscribe(naar => {
      this.naarLayer.clearLayers();
      const geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#000",
        color: "#f6be0e",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      };
      L.geoJson(
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": naar
          }
        }
        , {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      }).addTo(this.naarLayer);
    });
  }

}
