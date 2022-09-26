import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-status-toggle/flight-status-toggle.component';
import { FlightValidationErrorsComponent } from './flight-validation-errors/flight-validation-errors.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartComponent } from './chart/chart.component';

import { CityValidatorDirective } from './shared/validation/city-validator.directive';
import { AsyncCityValidatorDirective } from './shared/validation/async-city-validator.directive';
import { MultiFieldValidatorDirective } from './shared/validation/multi-field-validator.directive';
import { AsyncMultiFieldValidatorDirective } from './shared/validation/async-multi-field-validator.directive';

import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(FLIGHT_BOOKING_ROUTES), SharedModule],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    FlightStatusToggleComponent,
    FlightValidationErrorsComponent,
    FlightEditComponent,
    ChartsComponent,
    ChartComponent,
    CityValidatorDirective,
    AsyncCityValidatorDirective,
    MultiFieldValidatorDirective,
    AsyncMultiFieldValidatorDirective
  ],
  providers: [],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
