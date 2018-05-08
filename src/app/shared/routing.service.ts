import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoutingService {
  public routeApi = '//api.onbegluurd.nl/utrecht/api/route';
  private onbegluurd = false;
  private vanSubject = new Subject();
  private naarSubject = new Subject();
  private routeSubject = new Subject();
  private van = [];
  private naar = [];

  constructor(private http: AppHttpService) {
   
  }
  public getRouteApi(city) {
    return '//api.onbegluurd.nl/'+city+'/api/route/';
  }
  public setBegluurdStatus(bool: boolean) {
    this.onbegluurd = bool;
  }

  public getCameraRoute(city, privacy) {
    const body = {"privacy": privacy, "start": {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":this.van }},"end":{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":this.naar}}};
    return this.http.post(this.getRouteApi(city), body);
  }

  public findRoute(city) {
    if(this.van.length>0&&this.naar.length>0) {
      this.getCameraRoute(city, this.onbegluurd).then(route => {
        this.setRoute(route);
      });
    }
  }

  public setVan(origin) {
    this.van = origin;
    this.vanSubject.next(origin);
  }

  public getVan() {
    return this.vanSubject.asObservable();
  }

  public clearVanAndNaar(){
    this.vanSubject.next([]);
    this.naarSubject.next([]);
  }

  public setNaar(destination) {
    this.naar = destination;
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
