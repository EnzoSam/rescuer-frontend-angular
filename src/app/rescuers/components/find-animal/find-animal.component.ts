import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFilterPanelComponent } from "../find-filter-panel/find-filter-panel.component";
import { FindAnimalListComponent } from "../find-animal-list/find-animal-list.component";
import { IFilter } from '../../interfaces/filter.interface';
import { Animal } from '../../models/animal.model';
import { IPost } from '../../interfaces/post.interface';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { PostService } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-find-animal',
    standalone: true,
    templateUrl: './find-animal.component.html',
    styleUrl: './find-animal.component.css',
    imports: [CommonModule, MatButtonModule,FindFilterPanelComponent, 
        FindAnimalListComponent]
})
export class FindAnimalComponent implements OnInit{

    posts:IPost[] = [];

    constructor(private _postService:PostService,
        private _uiService:UiService)
    {
        
    }
    ngOnInit(): void {
       this.onFilterChanged(undefined)
    }

    onFilterChanged(filter:IFilter | undefined)
    {
        console.log(filter)
        this._postService.filter(filter)
        .then((response:IBasicResponse)=>
        {
          this.posts = response.data;
        })
        .catch(error=>
          {
              this._uiService.setNewErrorStatus
              ('Eror al recuperar publicaciones', error);
          }
        )
    }
}
