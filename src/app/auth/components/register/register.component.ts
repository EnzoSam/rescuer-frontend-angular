import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IRegister } from '../../interfaces/register.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register: IRegister;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _authService: AuthService) {
    this.register = _authService.newRegister();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'El email es requerido';
    }

    return this.email.hasError('email') ? 'El email no es válido' : '';
  }

  submit(e: any): void {
    e.preventDefault();
    this.register.email = this.email.value + '';
    this._authService.initRegister(this.register).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}
