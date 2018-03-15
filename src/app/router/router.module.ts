import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from '../map/map.component';
import { CityPickerComponent } from './city-picker.component';

const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: 'kiezen'
  },{
  path: 'kiezen',
  component: CityPickerComponent
  },{
  path: 'kaart',
  component: MapComponent
  },
  {
  path: 'kaart/:city',
  component: MapComponent
  },
  {
  path: '*',
  redirectTo: 'kiezen'
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [
    RouterModule,
    CityPickerComponent
  ],
  declarations: [CityPickerComponent],
  providers: [
  ]
})
export class AppRouterModule { }
