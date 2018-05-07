import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';
@Injectable()
export class RoutingService {
  private googleProxy = 'http://localhost:3000/direction-proxy?';
  private googleUrlEndpoint = 'https://maps.googleapis.com/maps/api/directions/json?';
  private googleApiKey = 'AIzaSyDWy6wP5gJzKJ0xc7UV7j1gUJ2cv4NZv20';
  private onbegluurd = false;

  constructor(private http: AppHttpService) {

  }
  //
  // public getCyclingDirections(origin: string, destination: string) {
  //   /* Origin/Destination can be either address name or latlng string */
  //   const params = {
  //     origin: origin,
  //     destination: destination,
  //     mode: 'bicycling',
  //     key: this.googleApiKey
  //   }
  //   return this.http.get(this.googleProxy + querystring.stringify(params)).then(directions => {
  //     directions.geometry = this.createRouteLinestring(directions);
  //     return directions;
  //   });
  // }

  public setBegluurdStatus(bool: boolean) {
    this.onbegluurd = bool;
  }

  private getNonCameraRoute(origin, destination) {
    const body = {"privacy": true, "start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[5.087872,52.072859]}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[5.119543,52.074152]}}};
    return this.http.post('http://service.geoloep.nl/routing/api/route/', body);
  }

  private getCameraRoute(origin, destination) {
    const body = {"privacy": false,"start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[5.087872,52.072859]}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[5.119543,52.074152]}}};
    return this.http.post('http://service.geoloep.nl/routing/api/route/', body);
  }

  public getRoute(origin, destination) {
    if (this.onbegluurd) {
      return this.getNonCameraRoute(origin, destination);
    } else {
      return this.getCameraRoute(origin, destination);
    }
  }
  // public createRouteLinestring(directions) {
  //   const geometry = {
  //     type: 'LineString',
  //     coordinates: []
  //   }
  //   directions.routes[0].legs.forEach(leg => {
  //     leg.steps.forEach(step => {
  //       const start = [step.start_location.lng, step.start_location.lat];
  //       const end = [step.end_location.lng, step.end_location.lat];
  //       geometry.coordinates.push(start);
  //       geometry.coordinates.push(end);
  //     })
  //   })
  //
  //   return geometry;
  // }

}
