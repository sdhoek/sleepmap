import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { CityLocations } from './city-locations.data';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map;
  private kaart: L.TileLayer;
  private city: string;
  private cityLocations = CityLocations;
  
  constructor(private route: ActivatedRoute) {
    this.city = this.route.snapshot.params.city;
  }

  ngOnInit() {

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

    this.kaart = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 24,
      zIndeX: 0
    });

    this.kaart.addTo(this.map);
  }


}
