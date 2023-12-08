import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../../shared/services/ui.service';
import { PasswordValidator } from '../../../shared/validators/password.validator';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  hide = true;
  mail?: string;
  token?: string;

  constructor(private _activateRoute: ActivatedRoute,
    private _authService: AuthService,
    private _uiService: UiService,
    private _router: Router) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    },
    {
      validators:PasswordValidator.PasswordMatch
    });
  }
  ngOnInit(): void {

    if (!this._activateRoute.snapshot.paramMap.has('email') ||
      !this._activateRoute.snapshot.paramMap.has('token'))
      return;

    this._activateRoute.params.subscribe(params => {
      this.mail = params['email'];
      this.token = params['token'];
    });
  }

  get password() { return this.form.get('password'); }
  get password2() { return this.form.get('password2'); }

  submit(e: any) {
    e.preventDefault();

    if (!this.mail || !this.token || !this.password?.value)
      return;

    this._authService.changePassword(this.mail, this.token, this.password.value).then
      (result => {
        if (result.code == 200)
          this._router.navigate(['../verify', '1']);
        else
          this._uiService.setNewErrorStatus(result.message, result);
      })
      .catch(error => {
        this._uiService.setNewErrorStatus(error.message, error);
      })
  }

}
