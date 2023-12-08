import { AbstractControl, ValidationErrors } from "@angular/forms";


export class PasswordValidator
{
    static PasswordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password2')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}