import { Routes } from '@angular/router';

import { FlightSearchComponent } from './flight-search/flight-search.component';
// import { ChartsComponent } from './charts/charts.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'flight-edit/:id',
    component: FlightEditComponent
  },
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  /*{
    path: 'charts',
    component: ChartsComponent
  }*/
  {
    path: 'charts',
    loadComponent: () => import('./charts/charts.component').then((c) => c.ChartsComponent)
  }
];
