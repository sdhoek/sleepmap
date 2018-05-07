import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PopupComponent } from './map/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule} from './router/router.module';
import { GraphComponent } from './map/graph/graph.component';

import { ColofonComponent } from './colofon/colofon.component';

import { FromToComponent } from './map/from-to/from-to.component';

import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    GraphComponent,
    ColofonComponent,
    FromToComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRouterModule,
    WebcamModule
  ],
  exports: [
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
