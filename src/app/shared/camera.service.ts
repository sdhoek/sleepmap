import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable()
export class CameraService {

  constructor(private http: AppHttpService) {

  }

  public getCameras() {
    return this.http.get('../../assets/camera_all.json');
  }

  public getCameraViewsheds() {
    return this.http.get('../../assets/viewsheds_25meter_v3.json');
  }


}
