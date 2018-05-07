import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';

@Injectable()
export class RoutingService {
  public routeApi = 'http://api.onbegluurd.nl/utrecht/api/route';
  private onbegluurd = false;

  constructor(private http: AppHttpService) {
   
  }
  public getRouteApi(city) {
    return 'http://api.onbegluurd.nl/'+city+'/api/route';
  }
  public setBegluurdStatus(bool: boolean) {
    this.onbegluurd = bool;
  }

  public getNonCameraRoute(origin, destination,city) {
    const body = {"privacy": true, "start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":origin}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":destination}}};
    return this.http.post(this.getRouteApi(city), body);
  }

  public getCameraRoute(origin, destination,city) {
    const body = {"privacy": false,"start":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":origin}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":destination}}};
    return this.http.post(this.getRouteApi(city), body);
  }

  public getRoute(origin, destination,city) {
    if (this.onbegluurd) {
      return this.getNonCameraRoute(origin, destination,city);
    } else {
      return this.getCameraRoute(origin, destination,city);
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
