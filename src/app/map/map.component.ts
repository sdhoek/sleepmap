import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { CityLocations } from './city-locations.data';
import { CameraService } from '../shared/camera.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map;
  private kaart: L.TileLayer;
  private cameraLayer: L.GeoJSON;
  private city: string;
  private cityLocations = CityLocations;

  constructor(private route: ActivatedRoute, private cameraService: CameraService) {
    this.city = this.route.snapshot.params.city;
  }

  ngOnInit() {
    this.cameraService.getCameras().then(cameras => {
      this.drawCameras(cameras);
    });
  }

  ngAfterViewInit() {
    const mapCenter = this.cityLocations.find(cityLoc => cityLoc.name === this.city).location;

    this.map = new L.Map('map', {
      center: [mapCenter.lat, mapCenter.lon],
      maxZoom: 24,
      zoom: 15,
      attributionControl: false,
      zoomControl: false
    });

    this.kaart = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 24,
      zIndeX: 0
    });

    this.cameraLayer = L.geoJson().addTo(this.map);
    this.kaart.addTo(this.map);
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
    console.log(cameras);
  }


}
