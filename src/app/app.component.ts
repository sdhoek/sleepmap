import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public showWebcam = true;
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

}
