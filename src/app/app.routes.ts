import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module').then((m) => m.FlightBookingModule)
  },
  {
    path: 'another-flight-booking',
    loadChildren: () => import('./another-flight-booking/another-flight-booking.module').then((m) => m.AnotherFlightBookingModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
