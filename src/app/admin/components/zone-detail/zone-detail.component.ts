import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IZone } from '../../interfaces/izone.interface';
import { ZoneService } from '../../services/zone.service';
import { Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZoneType } from '../../constants/zones.constants';
import { AdminPaths } from '../../constants/adminPaths.constant';

@Component({
  selector: 'app-zone-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './zone-detail.component.html',
  styleUrl: './zone-detail.component.css'
})
export class ZoneDetailComponent {

  form:FormGroup;
  zone:IZone;
  zonesTypes = ZoneType;

  constructor(private _zoneService:ZoneService,
    private _router:Router,
    private _uiService:UiService,
    private _location:Location)
  {
    this.zone = this._zoneService.new();
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
      code : new FormControl(''),
      zoneType : new FormControl('', [Validators.required]),
    });      
  }

  get name() { return this.form.get('name'); }
  get code() { return this.form.get('code'); }
  get zoneType() { return this.form.get('zoneType'); }
  
  submit(e: any): void {
    e.preventDefault();

    this.zone  = this.form.value;
    console.log(this.zone);
    this._zoneService.create(this.zone)
    .then((response:IBasicResponse) => {
      
          this._location.back();
      
    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }
}
