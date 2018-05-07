import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoutingService {
  public routeApi = 'http://api.onbegluurd.nl/utrecht/api/route';
  private onbegluurd = false;
  private vanSubject = new Subject();
  private naarSubject = new Subject();
  private routeSubject = new Subject();

  constructor(private http: AppHttpService) {
   
  }
  public getRouteApi(city) {
    return 'http://api.onbegluurd.nl/'+city+'/api/route/';
  }
  public setBegluurdStatus(bool: boolean) {
    this.onbegluurd = bool;
  }

  public getCameraRoute(origin, destination, city, privacy) {
    const body = {"privacy": privacy, "start": {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":origin}},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":destination}}};
    return this.http.post(this.getRouteApi(city), body);
  }

  public findRoute(origin, destination, city) {
    this.setRoute(this.getCameraRoute(origin, destination, city, this.onbegluurd));
  }

  public setVan(origin) {
    this.vanSubject.next(origin);
  }

  public getVan() {
    return this.vanSubject.asObservable();
  }

  public setNaar(destination) {
    this.naarSubject.next(destination);
  }

  public getNaar() {
    return this.naarSubject.asObservable();
  }

  public getRoute() {
    return this.routeSubject.asObservable();
  }

  public setRoute(route) {
    this.routeSubject.next(route);
  }

}
