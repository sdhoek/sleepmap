import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PopupComponent } from './map/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule} from './router/router.module';
<<<<<<< HEAD
import { ColofonComponent } from './colofon/colofon.component';
=======
import { FromToComponent } from './map/from-to/from-to.component';

>>>>>>> 2d4ef8fac75d41cdf0a5abd906ff35b6db520646
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
<<<<<<< HEAD
    ColofonComponent
=======
    FromToComponent
>>>>>>> 2d4ef8fac75d41cdf0a5abd906ff35b6db520646
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
