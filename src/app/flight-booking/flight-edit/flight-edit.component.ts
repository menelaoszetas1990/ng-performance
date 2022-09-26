import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';

import { FlightService } from '../shared/services/flight.service';
import { Flight } from '../../entities/flight';
import { validateCity } from '../shared/validation/city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';
import { pattern } from '../../shared/global';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit {
  @Input() flight: Flight;
  @Output() flightChange = new EventEmitter<Flight>();

  debug = true;
  id: string;
  showDetails: string;

  pattern = pattern;

  editForm: FormGroup = this.fb.group({
    id: [0, Validators.required, []],
    from: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(this.pattern),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    to: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(this.pattern),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []]
  });

  message = '';

  constructor(private fb: FormBuilder, private flightService: FlightService, private route: ActivatedRoute, private router: Router) {
    this.editForm.validator = validateRoundTrip;
  }

  ngOnChanges(): void {
    this.patchFormValue();
  }

  ngOnInit(): void {
    this.editForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date)
      )
      .subscribe((value) => {
        console.log(value);
      });

    this.route.params.subscribe((params) => this.onRouteParams(params));
  }

  save(): void {
    this.message = 'Is saving ...';

    const flightToSave: Flight = this.editForm.value;

    this.flightService
      .save(flightToSave)
      .pipe(delay(3000))
      .subscribe({
        next: (flight) => {
          // console.warn('FlightEditComponent - save()');
          // console.log(flight);

          // this.flight.date = flight.date;
          // this.flight.delayed = flight.delayed;
          // this.flight.from = flight.from;
          // this.flight.id = flight.id;
          // this.flight.to = flight.to;

          this.flightChange.emit(flight);

          this.flight = flight;
          this.message = 'Success saving! Navigating ...';
          this.patchFormValue();

          setTimeout(() => this.router.navigate(['/flight-search']), 3000);
        },
        error: (errResponse) => {
          console.error(errResponse);
          this.message = 'Error saving!';
        }
      });
  }

  private patchFormValue() {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  private onRouteParams(params: Params) {
    this.id = params['id'];
    this.showDetails = params['showDetails'];

    this.flightService.findById(this.id).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.message = 'Success loading!';
        this.patchFormValue();
      },
      error: (errResponse) => {
        console.error(errResponse);
        this.message = 'Error Loading!';
      }
    });
  }
}
