import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AnotherChartsComponent } from './another-charts/another-charts.component';
import { AnotherChartComponent } from './another-chart/another-chart.component';

import { ANOTHER_FLIGHT_BOOKING_ROUTES } from './another-flight-booking.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ANOTHER_FLIGHT_BOOKING_ROUTES), SharedModule],
  declarations: [AnotherChartsComponent, AnotherChartComponent],
  providers: [],
  exports: []
})
export class AnotherFlightBookingModule {}
