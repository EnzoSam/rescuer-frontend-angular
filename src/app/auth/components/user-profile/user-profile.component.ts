import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { Backend } from '../../../shared/constants/api.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, 
    MatIconModule, MatButtonModule,UploadFileComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  form:FormGroup;
  user:IUser;
  urlUploads:string;
  image = '';

  constructor(private _userService:AuthService,
    private _router:Router,
    private _uiService:UiService,
    private _activateRoute:ActivatedRoute)
  {
    this.urlUploads = Backend.UploadsUrl + 'auth/uploads';
    this.user = this._userService.newUser();
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
    });      
  }

  get name() { return this.form.get('name'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  
  submit(e: any): void {
    e.preventDefault();

    this.user.name  = this.form.value.name;
    this.user.lastName  = this.form.value.lastName;    
    this.user.image = this.image;
    this._userService.updateUser(this.user)
    .then((response:IBasicResponse) => {
      
      this._router.navigate(['../']);
      
    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  ngOnInit(): void {
  
    let {userName} = this._uiService.getAuthentication();
    if(userName)
      this.load(userName);
  }

  load(_userName:any)
  {
    this._userService.getByUserEmail(_userName)
    .then((response:IBasicResponse)=>
    {      
      this.user = response.data;
      this.image = this.user.image
      this.form.patchValue({
        name: this.user.name,
        lastName: this.user.lastName,
        image: this.user.image,
        email: this.user.email
        });

    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  onFileUploaded(file:UploadableFile)
  {
    this.image = file.name;
  }

  getUrlImage():string
  {
    return Backend.ResourcesUrl + 'users/' + this.image;
  }
}
