import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../interfaces/login.interface';
import { AuthService } from '../../service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatFormFieldModule, 
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login:ILogin;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private _authService:AuthService)
  {
    this.login = this._authService.newLogin();
  }

  ngOnInit(): void {
    
    
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'El email es requerido';
    }

    return this.email.hasError('email') ? 'El email no es válido' : '';
  }

}
