import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,RouterLink,MatCardModule, MatFormFieldModule, 
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean = false;

  constructor(private _authService:AuthService,
    private _uiService:UiService,
    private _router:Router)
  {

  }

  submit(e:any)
  {
    e.preventDefault();

    let mailString = this.email.value + '';
    this._authService.requestResetPassword(mailString).then(value=>
      {
        if(value.code == 200)
          this._router.navigate(['../verify','1']);
        else
          this._uiService.setNewErrorStatus(value.message, value);
      }).catch(error=>
        {
          this._uiService.setNewErrorStatus(error.message, error);
        })
  }
}
