import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from '../../services/ui.service';
import { IAuthentication } from '../../interfaces/authentication.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule,RouterLink, MatMenuModule,MatIconModule, MatButtonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent implements OnInit{

 aunthentication?:IAuthentication;

 constructor(private _uiService:UiService)
 {
  
 }
  ngOnInit(): void {
    
    this._uiService.onAccountStatusChange().subscribe(_authentication=>
      {
          this.aunthentication = _authentication;
      });
  }

  isAuthenticated()
  {
    return this.aunthentication && this.aunthentication.userName;
  }

}
