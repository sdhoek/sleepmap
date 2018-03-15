import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable()
export class CameraService {

  constructor(private http: AppHttpService) {

  }

  public getCameras() {
    this.http.get('../../assets/camera_all.json').then(camera => console.log(camera));
  }

}
