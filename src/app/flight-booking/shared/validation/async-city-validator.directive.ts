import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FlightService } from '../services/flight.service';

@Directive({
  selector: 'input[asyncCity]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncCityValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncCityValidatorDirective implements AsyncValidator {
  constructor(private flightService: FlightService) {}

  validate(c: AbstractControl): Observable<ValidationErrors | null> {
    return this.flightService.find(c.value, '').pipe(
      map((flights) => (flights.length > 0 ? null : { asyncCity: true })),
      delay(2000) // <-- delay; can be removed later...
    );
  }
}
