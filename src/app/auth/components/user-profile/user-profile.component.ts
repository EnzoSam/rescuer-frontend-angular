import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser.interface';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { Backend } from '../../../shared/constants/api.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';
import { IContact } from '../../../admin/interfaces/icontact.interface';
import { ContactService } from '../../../shared/services/contact.service';
import { whatsappValidator } from '../../../shared/validators/whatsapp.validator';
import { ContactsType } from '../../../shared/constants/contact.constant';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { CaregiverProfileResumeComponent } from '../caregiver-profile-resume/caregiver-profile-resume.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, PersonalDataComponent,
    CaregiverProfileResumeComponent
  ],
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
    private _activateRoute:ActivatedRoute,
  private _contactService:ContactService)
  {
    this.urlUploads = Backend.UploadsUrl + 'auth/uploads';
    this.user = this._userService.newUser();
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      whatsapp : new FormControl('', [whatsappValidator()])
    });      
  }

  get name() { return this.form.get('name'); }
  get lastName() { return this.form.get('lastName'); }
  get whatsapp() { return this.form.get('whatsapp'); }
  
  submit(e: any): void {
    e.preventDefault();

    this.user.name  = this.form.value.name;
    this.user.lastName  = this.form.value.lastName;    
    this.user.image = this.image;
    this._userService.addWhatsappContact(this.user, this.form.value.whatsapp);
    this._userService.updateUser(this.user)
    .then((response:IBasicResponse) => {
      
      this._uiService.setNewMessageStatus('Perfil actualizado',{});
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
        whatsapp: this._contactService.getByType
        (this.user.contacts, ContactsType.Whatsapp),
        image: this.user.image
        });

        if(!this.user.contacts || this.user.contacts.length === 0)
          {
            this.user.contacts = []
            this.user.contacts.push(this._contactService.new());
          }
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

  onContactChanged(_contacts:IContact[])
  {
    this.user.contacts = _contacts;
  }  
}
