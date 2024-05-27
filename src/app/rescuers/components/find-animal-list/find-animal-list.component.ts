import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { FindPublicationCardComponent } from "../find-publication-card/find-publication-card.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { IFilter } from '../../interfaces/filter.interface';

@Component({
    selector: 'app-find-animal-list',
    standalone: true,
    templateUrl: './find-animal-list.component.html',
    styleUrl: './find-animal-list.component.css',
    imports: [CommonModule, RouterLink, FindPublicationCardComponent, MatButtonModule]
})
export class FindAnimalListComponent{

  @Input() posts:IPost[];

  constructor()
  {
    this.posts = [];
  }

  
}
