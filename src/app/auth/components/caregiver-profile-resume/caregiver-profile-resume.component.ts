import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICaregiver } from '../../interfaces/icaregiver.interface';
import { CaregiverService } from '../../services/caregiver.service';
import { RouterLink } from '@angular/router';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthPaths } from '../../constants/authPath.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { IAuthentication } from '../../../shared/interfaces/authentication.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-caregiver-profile-resume',
  standalone: true,
  imports: [CommonModule,RouterLink,MatButtonModule,MatCardModule],
  templateUrl: './caregiver-profile-resume.component.html',
  styleUrl: './caregiver-profile-resume.component.css'
})
export class CaregiverProfileResumeComponent implements OnInit,OnDestroy{

  caregiver?:ICaregiver
  paths = AuthPaths;
  authSuscrip:Subscription;

  constructor(private _caregiverService:CaregiverService,
    private _uiService:UiService
  )
  {
    this.authSuscrip = _uiService.onAccountStatusChange().subscribe
    ((auth:IAuthentication) =>
      {
        this.load();        
      }
    )
  }
  ngOnDestroy(): void {
    if(this.authSuscrip)
      this.authSuscrip.unsubscribe();
  }

  ngOnInit(): void {
  }

  load() {
    const auth = this._uiService.getAuthentication();
    if (!auth)
      return;
        
    this._caregiverService.getByUserEmail(auth.userName)
      .then((response: IBasicResponse) => {
        if (response.data) {
          this.caregiver = response.data;
        }
      }).catch(error => {
        this._uiService.setNewErrorStatus(error.message, error);
      });
  }
}
