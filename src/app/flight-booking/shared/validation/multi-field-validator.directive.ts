import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'form[roundTrip]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MultiFieldValidatorDirective, multi: true }]
})
export class MultiFieldValidatorDirective implements Validator {
  @Input() roundTrip: string[];

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.roundTrip?.length !== 2) {
      return null;
    }

    const group: FormGroup = c as FormGroup; // type cast

    const fromCtrl = group.controls[this.roundTrip[0]];
    const toCtrl = group.controls[this.roundTrip[1]];

    if (!fromCtrl || !toCtrl) return null;

    if (fromCtrl.value && fromCtrl.value === toCtrl.value) {
      return {
        roundTrip: true
      };
    }

    return null;
  }
}
