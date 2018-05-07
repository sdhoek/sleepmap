import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';
@Injectable()
export class RoutingService {
  private routeApi = 'http://176.9.0.106:8000/api/route/';
  private onbegluurd = false;

  constructor(private http: AppHttpService) {

  }
  
  public setBegluurdStatus(bool: boolean) {
    this.onbegluurd = bool;
  }

  private getNonCameraRoute(origin, destination) {
    const body = {"privacy": true, "start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":origin}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":destination}}};
    return this.http.post(this.routeApi, body);
  }

  private getCameraRoute(origin, destination) {
    const body = {"privacy": false,"start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":origin}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":destination}}};
    return this.http.post(this.routeApi, body);
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
