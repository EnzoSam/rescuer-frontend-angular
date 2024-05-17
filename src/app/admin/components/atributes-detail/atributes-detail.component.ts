import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { group } from '@angular/animations';
import { IAtribute } from '../../interfaces/iatribute.interface';
import { AtributeService } from '../../services/atributes.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Router } from '@angular/router';
import { UiService } from '../../../shared/services/ui.service';
import { AdminPaths } from '../../constants/adminPaths.constant';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';
import { Backend } from '../../../shared/constants/api.constant';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';

@Component({
  selector: 'app-atributes-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, 
    MatIconModule, MatButtonModule,UploadFileComponent],
  templateUrl: './atributes-detail.component.html',
  styleUrl: './atributes-detail.component.css'
})
export class AtributesDetailComponent {

  form:FormGroup;
  atribute:IAtribute;
  urlUploads:string;
  image = '';

  constructor(private _atributeService:AtributeService,
    private _router:Router,
    private _uiService:UiService)
  {
    this.urlUploads = Backend.UploadsUrl + 'atributes/uploads';
    this.atribute = this._atributeService.new();
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
      group : new FormControl('', [Validators.required]),
    });      
  }

  get name() { return this.form.get('name'); }
  get group() { return this.form.get('group'); }
  
  submit(e: any): void {
    e.preventDefault();

    this.atribute  = this.form.value;
    this.atribute.image = this.image;
    this._atributeService.create(this.atribute)
    .then((response:IBasicResponse) => {
      
      this._router.navigate(['../' + 
      AdminPaths.dashboard + '/' + AdminPaths.atributes])
      
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
    return Backend.ResourcesUrl + 'atributes/' + this.image;
  }
}
