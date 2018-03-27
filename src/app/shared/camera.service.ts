import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

import * as cityData from '../../assets/city_outlinesv2.json';
import * as cameraData from '../../assets/camera_all.json';
import * as viewShedData from '../../assets/viewsheds_25meter_v3.json';
const anyCityData = cityData as any;
const anyCameraData = cameraData as any;
const anyViewShedData = viewShedData as any;

@Injectable()
export class CameraService {
  public cityOutlines = anyCityData;
  public cameras = anyCameraData;
  public viewsheds = anyViewShedData;

  constructor(private http: AppHttpService) {

  }

  public getCameras() {

    return this.http.get('../../assets/camera_all.json');
  }

  public getCameraViewsheds() {
    return this.http.get('../../assets/viewsheds_25meter_v3.json');
  }

  public getCityOutlines() {
    return this.cityOutlines;
  }


}
