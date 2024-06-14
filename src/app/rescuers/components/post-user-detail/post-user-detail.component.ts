import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../auth/interfaces/iuser.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContactLinkComponent } from '../../../shared/components/contact-link/contact-link.component';

@Component({
  selector: 'app-post-user-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,ContactLinkComponent],
  templateUrl: './post-user-detail.component.html',
  styleUrl: './post-user-detail.component.css'
})
export class PostUserDetailComponent implements OnInit{

  @Input() userId?:any;
  user?:IUser;
  userDataVisible:boolean;
  constructor(private _authService:AuthService)
  {
      this.userDataVisible = false;
  }
  ngOnInit(): void {
    
    console.log(this.userId)
    if(this.userId)
    {
      this._authService.getById(this.userId)
      .then((respone:IBasicResponse)=>
      {
        console.log(respone)
        this.user = respone.data;
      })
    }
  }
}
