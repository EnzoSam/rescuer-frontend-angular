import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpladFilesService } from '../../services/uploadFile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadableFile } from '../../interfaces/uploadableFile';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../services/ui.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
    MatCardModule, MatProgressSpinnerModule,MatIconModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {

  @Input() urlBase: string;
  @Input() avatarUrl?: string | null;
  @Input() avatarMode: boolean = false;
  @Output() fileUploaded = new EventEmitter<UploadableFile>();

  uploatedImageUrl: string;

  imageForm: FormGroup;
  image: any;
  file: any;
  loading = false;

  constructor(private _uploadService: UpladFilesService,
    private _uiService: UiService
  ) {
    this.urlBase = '';
    this.uploatedImageUrl = '';
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required)
    });
  }

  onFileSelected(event: Event): void {

  this.fileUploaded.emit(
    {
      url: '',
      fullPath: '',
      name:''
    });

    this.loading = true;
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;

    if (element.files && element.files[0]) {
      file = element.files[0];
      this._uploadService.addPicture('file01', file, this.urlBase)
        .then((response: IBasicResponse) => {
          this.loading = false;
          this.uploatedImageUrl = response.data.data.url;
          console.log(this.uploatedImageUrl)
          if (this.uploatedImageUrl)
            this.fileUploaded.emit(
              {
                url: this.uploatedImageUrl,
                fullPath: response.data.data.fullPath,
                name: response.data.data.name
              });
          else
            this._uiService.setNewErrorStatus('No se recibió la imagen.', {});
        }).catch(error => {
          this.loading = false;
          this._uiService.setNewErrorStatus('Error al subir imagen.', error);
        }
        )
    }
  }
}
