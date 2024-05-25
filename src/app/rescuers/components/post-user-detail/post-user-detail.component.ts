import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../auth/interfaces/iuser.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-user-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './post-user-detail.component.html',
  styleUrl: './post-user-detail.component.css'
})
export class PostUserDetailComponent implements OnInit{

  @Input() userId?:any;
  user?:IUser;
  constructor(private _authService:AuthService)
  {

  }
  ngOnInit(): void {
    
    console.log(this.userId)
    if(this.userId)
    {
      this._authService.getById(this.userId)
      .then((respone:IBasicResponse)=>
      {
        console.log(respone.data);
        this.user = respone.data;
      })
    }
  }
}
