
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function whatsappValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValidWhatsApp = /^\d{10}$/.test(control.value);
    return isValidWhatsApp ? null : { invalidWhatsApp: true };
  };
}
