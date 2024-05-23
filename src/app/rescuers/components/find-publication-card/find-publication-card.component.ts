import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Backend } from '../../../shared/constants/api.constant';
import { RescuersPaths } from '../../constants/rescuersPaths.constant';

@Component({
  selector: 'app-find-publication-card',
  standalone: true,
  imports: [CommonModule,RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './find-publication-card.component.html',
  styleUrl: './find-publication-card.component.css'
})
export class FindPublicationCardComponent {

  @Input() publication?:IPost;
  pathDetail = RescuersPaths.postAnimalDetail;

  constructor()
  {

  }

  getUrlImage():string
  {
    if(this.publication && this.publication.image)
      return Backend.ResourcesUrl + 'animals/' + this.publication?.image;
    else
      return '';
  }
}
