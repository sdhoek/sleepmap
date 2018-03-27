import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { ActivatedRoute } from '@angular/router';
import { CityLocations } from './city-locations.data';
import { CameraService } from '../shared/camera.service';
import { RoutingService } from '../shared/routing.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map;
  private kaart: L.TileLayer;

  private cameraLayer: L.GeoJSON;
  private routeLayer: L.GeoJSON;
  private viewShedLayer: L.GeoJSON;

  private city: string;
  private cityLocations = CityLocations;

  public origin: string = 'Kromme Nieuwegracht 3, Utrecht';
  public destination: string = 'Oudwijkerlaan 28, Utrecht';

  constructor(private route: ActivatedRoute, private cameraService: CameraService, private routingService: RoutingService) {
    this.city = this.route.snapshot.params.city;
  }

  ngOnInit() {
    this.cameraService.getCameras().then(cameras => {
      this.drawCameras(cameras);
    });

    this.cameraService.getCameraViewsheds().then(viewsheds => {
      this.drawViewsheds(viewsheds);
    });
  }

  ngAfterViewInit() {
    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === this.city).location;
    const maxBounds = this.cityLocations.find(cityLoc => cityLoc.name === this.city).mapBounds;

    this.map = new L.Map('map', {
      center: [mapCenter.lat, mapCenter.lon],
      maxZoom: 24,
      minZoom: 14,
      zoom: 16,
      attributionControl: false,
      zoomControl: false,
      maxBoundsViscosity: 0.5
    });

    this.map.setMaxBounds(maxBounds);

    this.kaart = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 24,
      zIndeX: 0
    });

    this.cameraLayer = L.geoJson().addTo(this.map);
    this.routeLayer = L.geoJson().addTo(this.map);
    this.viewShedLayer = L.geoJson().addTo(this.map);

    this.kaart.addTo(this.map);
    // Remove grey bar to the right.
    setTimeout(() => {
      this.map.invalidateSize();
    }, 400);
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

  public recenterMap(cityName) {
    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === cityName).location;
    const maxBounds = this.cityLocations.find(cityLoc => cityLoc.name === cityName).mapBounds;

    this.map.setMaxBounds(null);
    const animationDuration = 3; // duration of animation in seconds

    this.map.flyTo([mapCenter.lat, mapCenter.lon], 15, {
        animate: true,
        duration: animationDuration 
    })

    setTimeout(()=> {
      this.map.setMaxBounds(maxBounds)
    }, animationDuration * 1000);

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

  private drawRoute(routeGeometry) {
    this.routeLayer.clearLayers();
    L.geoJson(routeGeometry).addTo(this.routeLayer);
    this.map.fitBounds(this.routeLayer.getBounds());
  }

  public findRoute() {
    this.routingService.getCyclingDirections(this.origin, this.destination).then(directions => {
      this.drawRoute(directions.geometry);
      const intersection = this.intersectRouteWithViewshed(this.routeLayer.toGeoJSON(), this.viewShedLayer.toGeoJSON());
      this.drawIntersection(intersection);
    });
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

  public setOrigin() {

  }

  public setDestination() {

  }


}
