import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../../shared/services/ui.service';
import { consumerAfterComputation } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-validate-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-email.component.html',
  styleUrl: './validate-email.component.css'
})
export class ValidateEmailComponent implements OnInit {

  error?: any;
  validating = false;
  constructor(private _route: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private _activateRoute:ActivatedRoute,
    private _uiService: UiService) {


  }

  ngOnInit(): void {

    if(!this._activateRoute.snapshot.paramMap.has('email') || 
        !this._activateRoute.snapshot.paramMap.has('token'))
      return;

    this._activateRoute.params.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email && token) {
        this.validating = true;
        this._authService.validateMail(email, token).then(value => {  
          this.validating = false;        
          if (value.code == 200)
          {
            this._uiService.setNewMessageStatus('Cuenta validada correctamente.',{});
            this._router.navigate(['../auth/login']);
          }
          else
            this._uiService.setNewErrorStatus(value.message, value);
        }).catch(error => {
          this.validating = false;
          this._uiService.setNewErrorStatus(error, error);
        });
      }
    });
  }
}
