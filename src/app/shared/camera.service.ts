import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable()
export class CameraService {

  constructor(private http: AppHttpService) {

  }

}
