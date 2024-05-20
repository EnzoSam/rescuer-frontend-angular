import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadableFile } from '../../../shared/interfaces/uploadableFile';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';
import { Backend } from '../../../shared/constants/api.constant';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-select-image',
  standalone: true,
  imports: [CommonModule,UploadFileComponent,MatButtonModule],
  templateUrl: './select-image.component.html',
  styleUrl: './select-image.component.css'
})
export class SelectImageComponent {
  @Output() onImageSelected:EventEmitter<UploadableFile> =
   new EventEmitter<UploadableFile>();
   urlUploads:string;
    file?:UploadableFile;
   constructor()
  {
    this.urlUploads = Backend.UploadsUrl + 'animals/uploads';
  }


   onFileUploaded(file:UploadableFile)
   {
    this.file = file;
   }

   getUrlImage():string
   {
     return Backend.ResourcesUrl + 'animals/' + this.file?.name;
   }   

   onNext()
   {
    this.onImageSelected.emit(this.file);
   }
}
