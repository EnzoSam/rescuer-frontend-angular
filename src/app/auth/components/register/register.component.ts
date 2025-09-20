import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IRegister } from '../../interfaces/register.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { whatsappValidator } from '../../../shared/validators/whatsapp.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule,
     MatButtonModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register: IRegister;
  form:FormGroup;
  hide = true;
  proccessing = false;

  constructor(private _authService: AuthService,
    private _router:Router,
    private _uiService:UiService) {
    this.register = _authService.newRegister();   
    
    this.form = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
      name : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      phone : new FormControl('', [whatsappValidator()])
    });    
  }

  get email() { return this.form.get('email'); }
  get name() { return this.form.get('name'); }
  get lastName() { return this.form.get('lastName'); }
  get password() { return this.form.get('password'); }
  get phone() { return this.form.get('phone'); }

  submit(e: any): void {
    this.proccessing = true;
    
    e.preventDefault();    
    this.register  = this.form.value;
    
    this._authService.initRegister(this.register).then(response => {
      
      this.proccessing = false;
      if(response && response.statusCode == 200)
          this._router.navigate(['../auth/verify']);
      else
        this._uiService.setNewErrorStatus(response.message, undefined);
      
    }).catch(error => {
      this.proccessing = false;
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }
}
