import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IZone } from '../../interfaces/izone.interface';
import { ZoneService } from '../../services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZoneType } from '../../constants/zones.constants';
import { AdminParamPaths, AdminPaths } from '../../constants/adminPaths.constant';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';

@Component({
  selector: 'app-zone-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './zone-detail.component.html',
  styleUrl: './zone-detail.component.css'
})
export class ZoneDetailComponent implements OnInit {

  form: FormGroup;
  zone: IZone;
  zonesTypes = ZoneType;
  parentZone?:IZone;
  zoneType:string;

  constructor(private _zoneService: ZoneService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _uiService: UiService) {
    this.zone = this._zoneService.new();
    this.zoneType = ZoneType.Country;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl(''),
      zoneType: new FormControl({value:'', disabled:true}, [Validators.required]),
    });
  }
  ngOnInit(): void {

    if (this._activateRoute.snapshot.paramMap.has(AdminParamPaths.parentId)) {
      this._activateRoute.params.subscribe(params => {
        let idParam = params[AdminParamPaths.parentId];  
        console.log(idParam)      
        if(idParam && idParam != '')
        {
          this._zoneService.getById(idParam)
          .then((response:IBasicResponse)=>
          {
            this.parentZone = response.data;
            this.zoneType = this._zoneService.getChildType(this.parentZone?.zoneType || '');
            this.zone.parentZoneId = this.parentZone?.id;
            this.form.patchValue({
              zoneType: this.zoneType
              });
          }).catch(error => {
            this._uiService.setNewErrorStatus(error.message, error);
          });
        }
      });
    }
    
    if (this._activateRoute.snapshot.paramMap.has(RouterPathParams.id)) {
      this._activateRoute.params.subscribe(params => {
        const idParam = params[RouterPathParams.id];        
        if(idParam && idParam != '')
        {
            this.load(idParam);
        }
      });
    }
  }

  load(id:any)
  {
    this._zoneService.getById(id)
    .then((response:IBasicResponse)=>
    {
      this.zone = response.data;
      console.log(response.data)
      this.form.patchValue({
        name: this.zone.name,
        code: this.zone.code
        });

    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  get name() { return this.form.get('name'); }
  get code() { return this.form.get('code'); }

  submit(e: any): void {
    e.preventDefault();

    this.zone.name = this.form.value.name;
    this.zone.code = this.form.value.code;
    this.zone.zoneType = this.zoneType;      

    this._zoneService.createOrUpdeate(this.zone)
      .then((response: IBasicResponse) => {

        this._router.navigate(['../' + 
        AdminPaths.dashboard + '/' + AdminPaths.zone])

      }).catch(error => {
        this._uiService.setNewErrorStatus(error.message, error);
      });
  }
}
