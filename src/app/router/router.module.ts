import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from '../app.component';
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
  component: AppComponent
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
