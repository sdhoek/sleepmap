import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import * as querystring from 'querystring';
@Injectable()
export class RoutingService {
  private googleProxy = 'http://localhost:3000/direction-proxy?';
  private googleUrlEndpoint = 'https://maps.googleapis.com/maps/api/directions/json?';
  private googleApiKey = 'AIzaSyDWy6wP5gJzKJ0xc7UV7j1gUJ2cv4NZv20';

  constructor(private http: AppHttpService) {

  }

  public getCyclingDirections(origin: string, destination: string) {
    /* Origin/Destination can be either address name or latlng string */
    const params = {
      origin: origin,
      destination: destination,
      mode: 'bicycling',
      key: this.googleApiKey
    }
    return this.http.get(this.googleProxy + querystring.stringify(params)).then(directions => {
      directions.geometry = this.createRouteLinestring(directions);
      return directions;
    });
  }

  public createRouteLinestring(directions) {
    const geometry = {
      type: 'LineString',
      coordinates: []
    }
    directions.routes[0].legs.forEach(leg => {
      leg.steps.forEach(step => {
        const start = [step.start_location.lng, step.start_location.lat];
        const end = [step.end_location.lng, step.end_location.lat];
        geometry.coordinates.push(start)
        geometry.coordinates.push(end)
      })
    })

    return geometry;
  }

}
