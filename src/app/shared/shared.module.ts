import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpService } from './app-http.service';
import { CameraService } from './camera.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  providers: [
    AppHttpService,
    CameraService
  ]
})
export class SharedModule { }
