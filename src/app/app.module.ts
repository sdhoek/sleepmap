import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PopupComponent } from './map/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule} from './router/router.module';
import { ColofonComponent } from './colofon/colofon.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    ColofonComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
