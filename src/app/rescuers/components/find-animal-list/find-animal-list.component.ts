import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPublication } from '../../interfaces/publication.interface';
import { FindPublicationCardComponent } from "../find-publication-card/find-publication-card.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-find-animal-list',
    standalone: true,
    templateUrl: './find-animal-list.component.html',
    styleUrl: './find-animal-list.component.css',
    imports: [CommonModule, RouterLink, FindPublicationCardComponent, MatButtonModule]
})
export class FindAnimalListComponent implements OnInit{

  publications:IPublication[];

  constructor()
  {
    this.publications = [];
  }

  ngOnInit(): void {
    this.publications.push({id:1, title:'Publicacion 1', description:'', image:'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'});
    this.publications.push({id:2, title:'Publicacion 2', description:'', image:'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'});
    this.publications.push({id:3, title:'Publicacion 3',  description:'',image:'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'});
    this.publications.push({id:4, title:'Publicacion 4', description:'', image:'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'});
    this.publications.push({id:5, title:'Publicacion 5',  description:'',image:'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'});
    this.publications.push({id:6, title:'Publicacion 5',  description:'',image:'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'});

  }
  
}
