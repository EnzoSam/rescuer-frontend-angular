import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-publication-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent {

  publication?: IPost;

  constructor() {

    /*
    this.publication = { 
      id: 1, 
      title: 'Publicacion 1', 
      description: 'Descripcion de la publicacion 1', 
      image: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg' };*/
  }
}
