import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseflDataService } from '../../services/usefulData.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';
import { UiService } from '../../../shared/services/ui.service';
import { AdminPaths } from '../../constants/adminPaths.constant';
import { IUsefulData } from '../../interfaces/iusefulData.interface';
import { ContactsCreatorComponent } from '../../../shared/components/contacts-creator/contacts-creator.component';

@Component({
  selector: 'app-usefull-data-detail',
  standalone: true,
  imports: [CommonModule, ContactsCreatorComponent,MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, 
    MatIconModule, MatButtonModule],
  templateUrl: './usefull-data-detail.component.html',
  styleUrl: './usefull-data-detail.component.css'
})
export class UsefullDataDetailComponent {

  form:FormGroup;
  usefulData:IUsefulData;

  constructor(private _usefulDataService:UseflDataService,
    private _router:Router,
    private _uiService:UiService,
    private _activateRoute:ActivatedRoute)
  {
    this.usefulData = this._usefulDataService.new();
    this.form = new FormGroup({
      data : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
    });      
  }

  get data() { return this.form.get('data'); }
  get description() { return this.form.get('description'); }
  
  submit(e: any): void {
    e.preventDefault();

    this.usefulData.data  = this.form.value.data;
    this.usefulData.description  = this.form.value.description;
    this._usefulDataService.createOrUpdeate(this.usefulData)
    .then((response:IBasicResponse) => {
      
      this._router.navigate(['../' + 
      AdminPaths.dashboard + '/' + AdminPaths.usefulData])
      
    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  ngOnInit(): void {
  
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
    this._usefulDataService.getById(id)
    .then((response:IBasicResponse)=>
    {
      this.usefulData = response.data;
      this.form.patchValue({
        data: this.usefulData.data,
        description: this.usefulData.description
        });

    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

}
