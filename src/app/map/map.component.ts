import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { ActivatedRoute } from '@angular/router';
import { CityLocations } from './city-locations.data';
import { CameraService } from '../shared/camera.service';
import { RoutingService } from '../shared/routing.service';
import { Subscription } from 'rxjs/Subscription';

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
  private cityOutlineLayer: L.GeoJSON;

  private city: string;
  private cityLocations = CityLocations;
  private cityOutlines: any;

  public vanSubscription : Subscription;
  public naarSubscription : Subscription;
  public routeSubscription: Subscription;

  private vannaar = true;

  constructor(private route: ActivatedRoute, private cameraService: CameraService, private routingService: RoutingService) {
    this.city = this.route.snapshot.params.city;
    this.cityOutlines = this.cameraService.getCityOutlines();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === this.city).location;
    const maxBounds = this.cityLocations.find(cityLoc => cityLoc.name === this.city).mapBounds;

    this.map = new L.Map('map', {
      center: [mapCenter.lat, mapCenter.lon],
      maxZoom: 24,
      minZoom: 14,
      zoom: 16,
      zoomControl: false,
      maxBoundsViscosity: 0.5
    });

    this.map.on('click',this.getPoint,this)

    this.map.setMaxBounds(maxBounds);

    this.map.attributionControl.setPrefix('').setPosition('bottomleft');

    this.kaart = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
      attribution: 'Referentiekaart: <a href="https://www.openstreetmap.org">OpenStreetMap</a>.',
      maxZoom: 24,
      zIndeX: 0
    });

    this.cameraLayer = L.geoJson().addTo(this.map);
    this.noCameraRouteLayer = L.geoJson().addTo(this.map);
    this.cameraRouteLayer = L.geoJson().addTo(this.map);
    this.viewShedLayer = L.geoJson().addTo(this.map);
    this.cityOutlineLayer = L.geoJson().addTo(this.map);

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

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.vanSubscription.unsubscribe();
    this.naarSubscription.unsubscribe();
  }
 
  private getPoint(e) {
    if(this.vannaar) {
      this.routingService.setVan([e.latlng.lng,e.latlng.lat])
    }
    else {
      this.routingService.setNaar([e.latlng.lng,e.latlng.lat]);
      this.routingService.findRoute(this.city);
    }
    this.vannaar = !this.vannaar;


  }
  private drawViewsheds(viewsheds) {
    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: "red",
      color: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4
    };
    L.geoJson(viewsheds, geojsonMarkerOptions).addTo(this.viewShedLayer);
  }

  public recenterMap(cityName: string) {
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
      fillColor: "red",
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
    this.map.fitBounds(this.noCameraRouteLayer.getBounds());
  }

  private drawCameraRoute(routeGeometry) {
    this.cameraRouteLayer.clearLayers();
    L.geoJson(routeGeometry, {
      style: {
        color: 'red'
      }
    }).addTo(this.cameraRouteLayer);
    this.map.fitBounds(this.cameraRouteLayer.getBounds());
  }

  private intersectRouteWithViewshed(route, viewsheds) {
    let intersections = viewsheds.features.map(viewShed => {
      let inter = turf.intersect(turf.buffer(route.features[0].geometry, 0.5, {units: 'meters'}), viewShed.geometry);
      return inter
    });

    intersections = intersections.filter(intersection => intersection != null)
    return intersections;
  }

  private drawIntersection(intersectingLines) {
    L.geoJson(intersectingLines, {color: 'yellow', width: 10}).addTo(this.map);
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
    return this.routingService.getRoute().subscribe(route => {
      console.log('route', route);
    });
  }

  private subscribeToVan() {
    return this.routingService.getVan().subscribe(van => {
      console.log('van', van)
    });
  }

  private subscribeToNaar() {
    return this.routingService.getNaar().subscribe(naar => {
      console.log('naar', naar)
    });
  }

}
