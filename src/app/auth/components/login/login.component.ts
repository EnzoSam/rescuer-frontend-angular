import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login: ILogin;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _uiService: UiService,
    private _activateRoute: ActivatedRoute) {
    this.login = this._authService.newLogin();
  }

  ngOnInit(): void {

    if (this._activateRoute.snapshot.paramMap.has('out')) {
      this._activateRoute.params.subscribe(params => {

        const outP = params['out'];
        if (outP && outP === '1') {
          this._authService.logOut();
          this._router.navigate(['../home']);
        }
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'El email es requerido';
    }

    return this.email.hasError('email') ? 'El email no es válido' : '';
  }

  submit(e: any): void {
    e.preventDefault();
    this.login.email = this.email.value + '';
    this.login.password = this.password.value + '';
    this._authService.login(this.login).then(response => {

      console.log(response)
      this._authService.rememberUser
      (this.login.email, response.token, response.userId);
      this._router.navigate(['../home']);

    }).catch(error => {

      console.log(error)
      if (error.status === 401)
        this._uiService.setNewErrorStatus(error.error.message, error);
      else 
        this._uiService.setNewErrorStatus(error.message, error);
    });
  }
}
