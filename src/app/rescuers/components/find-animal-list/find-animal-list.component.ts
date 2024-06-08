import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { FindPublicationCardComponent } from "../find-publication-card/find-publication-card.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-find-animal-list',
    standalone: true,
    templateUrl: './find-animal-list.component.html',
    styleUrl: './find-animal-list.component.css',
    imports: [CommonModule, RouterLink, FindPublicationCardComponent, MatButtonModule]
})
export class FindAnimalListComponent{

  @Input() posts:IPost[];
  @Output() postStateChanged:EventEmitter<IPost> = new EventEmitter<IPost>();
  
  constructor()
  {
    this.posts = [];
  }

  onPostStateChanged(_post:IPost)
  {
    this.postStateChanged.emit(_post);
  }
}
