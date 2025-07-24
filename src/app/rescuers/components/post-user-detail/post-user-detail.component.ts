import { Component,  Inject,  Input, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IUser } from '../../../auth/interfaces/iuser.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContactLinkComponent } from '../../../shared/components/contact-link/contact-link.component';
import { Location } from '@angular/common';
import { ContactService } from '../../../shared/services/contact.service';
import { ContactsType } from '../../../shared/constants/contact.constant';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-post-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule,
     MatButtonModule, ContactLinkComponent, MatIconModule],
  templateUrl: './post-user-detail.component.html',
  styleUrl: './post-user-detail.component.css'
})
export class PostUserDetailComponent implements OnInit{

  @Input() userId?:any;
  user?:IUser;
  userDataVisible:boolean = true;
  loading = false;

  constructor(private _authService:AuthService,
    private _contactService:ContactService,
    private location: Location, 
    @Inject(DOCUMENT) private document: Document
  )
  {
  }
  ngOnInit(): void {
    
    if(this.userId)
    {
      this.loading = true;
      this._authService.getById(this.userId)
      .then((respone:IBasicResponse)=>
      {    
        this.loading = false;    
        this.user = respone.data; 
        if(this.user)
          {
            const mail = this._contactService.getByType
            (this.user.contacts, ContactsType.Mail)    
            if(!mail)
            {
              let contact = this._contactService.new(); 
              contact.contact = this.user.email;
              contact.type = ContactsType.Mail;
              this.user.contacts.push(contact); 
            }

          }
      })
    }
  }

  getPublicationContactText():string
  {    
    const baseHref = this.document.getElementsByTagName('base')[0].href;
    console.log(baseHref);
    const fullUrl = this.location.prepareExternalUrl(this.location.path());
    const completeUrl = baseHref + fullUrl.slice(1);
    return completeUrl;
  }
}
