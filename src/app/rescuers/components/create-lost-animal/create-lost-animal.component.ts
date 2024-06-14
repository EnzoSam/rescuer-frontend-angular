import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { UiService } from '../../../shared/services/ui.service';
import { Backend } from '../../../shared/constants/api.constant';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { AdminPaths } from '../../../admin/constants/adminPaths.constant';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';
import { RescuersPaths } from '../../constants/rescuersPaths.constant';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-create-lost-animal',
  standalone: true,
  imports: [CommonModule,RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule,
     MatIconModule, MatButtonModule,UploadFileComponent],
  templateUrl: './create-lost-animal.component.html',
  styleUrl: './create-lost-animal.component.css'
})
export class CreateLostAnimalComponent implements OnInit {

  animal: Animal;
  form:FormGroup;
  urlUploads:string;
  image = '';

  constructor(private _animalService: AnimalService,
    private _router: Router,
    private _uiService: UiService,
    private _activateRoute: ActivatedRoute) {
    this.animal = this._animalService.new();
    this.animal.lost = true;

    this.urlUploads = Backend.UploadsUrl + 'animals/uploads';
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
      description : new FormControl(''),
    });     
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }

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


  submit(e: any): void {
    e.preventDefault();

    this.animal.name  = this.form.value.name;
    this.animal.description  = this.form.value.description;
    this.animal.image = this.image;
    this._animalService.createOrUpdeate(this.animal)
    .then((response:IBasicResponse) => {
      
      this._router.navigate([
        RescuersPaths.publications + '/'+ 
        RescuersPaths.postAnimalDetail, response.data]);
      
    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  load(id:any)
  {
    this._animalService.getById(id)
    .then((response:IBasicResponse)=>
    {
      this.animal = response.data;
      this.image = this.animal.image || '';
      this.form.patchValue({
        name: this.animal.name,
        description: this.animal.description,
        image: this.animal.image        
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
    return Backend.ResourcesUrl + 'animals/' + this.image;
  }  
}
