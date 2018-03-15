import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map;
  private kaart: L.TileLayer;
  private city: string;
  constructor(private route: ActivatedRoute) {
    this.city = this.route.snapshot.params.city;
    console.log(this.city)
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.map = new L.Map('map', {
      center: [52.0907013, 5.1258586],
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
