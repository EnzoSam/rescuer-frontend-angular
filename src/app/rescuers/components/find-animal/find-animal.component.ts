import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFilterPanelComponent } from "../find-filter-panel/find-filter-panel.component";
import { FindAnimalListComponent } from "../find-animal-list/find-animal-list.component";
import { IFilter } from '../../interfaces/filter.interface';
import { IPost } from '../../interfaces/post.interface';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { PostService } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-find-animal',
    standalone: true,
    templateUrl: './find-animal.component.html',
    styleUrl: './find-animal.component.css',
    imports: [CommonModule, MatButtonModule,FindFilterPanelComponent, 
        FindAnimalListComponent,MatIconModule,
        MatSlideToggleModule,MatSidenavModule]
})
export class FindAnimalComponent implements OnInit{

    posts:IPost[] = [];
    filterOpened:boolean = true;
    lastFilter?:IFilter;
    
    constructor(private _postService:PostService,
        private _uiService:UiService)
    {
        
    }
    ngOnInit(): void {
       this.onFilterChanged(undefined);
    }

    refresh()
    {
        this.onFilterChanged(this.lastFilter);
    }

    onFilterChanged(filter:IFilter | undefined)
    {
        this.lastFilter = filter;
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
