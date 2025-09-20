
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function whatsappValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control)
      return null;
    if(!control.value)
      return null;
    const value = String(control.value || '').trim();
    if (!value) return null;

    const regex = /^([1-9]\d{2,4})(\d{6,8})$/;
    const isValidWhatsApp = regex.test(value);
    return isValidWhatsApp ? null : { invalidWhatsApp: true };
  };
}
