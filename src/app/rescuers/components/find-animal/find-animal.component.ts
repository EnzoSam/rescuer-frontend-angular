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
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-find-animal',
    standalone: true,
    templateUrl: './find-animal.component.html',
    styleUrl: './find-animal.component.css',
    imports: [CommonModule, MatButtonModule,FindFilterPanelComponent, 
        FindAnimalListComponent,MatIconModule,
        MatSlideToggleModule,MatSidenavModule,RouterLink]
})
export class FindAnimalComponent implements OnInit{

    posts:IPost[] = [];
    filterOpened:boolean = true;
    lastFilter:IFilter;
    lostMode:boolean = false;
    title:string;

    constructor(private _postService:PostService,
        private _uiService:UiService,
        private _activatedRoute:ActivatedRoute,
        private _filterService:FilterService)
    {
        this.title = 'Encontrá a tu nueva mascota'
        this.lastFilter = _filterService.new();        
    }
    ngOnInit(): void {

        if(this._activatedRoute.data)
        {
            let {lost} = this._activatedRoute.snapshot.data;
            if(lost)
            {
                this.lostMode = lost;
                if(this.lostMode)
                    this.title = 'Mascotas extraviadas'
            }
        }
        this.onFilterChanged(this.lastFilter);
    }

    refresh()
    {
        this.onFilterChanged(this.lastFilter);
    }

    onFilterChanged(filter:IFilter)
    {
        filter.lost = this.lostMode;
        this.lastFilter = filter;
        console.log(filter)
        this._postService.filter(filter)
        .then((response:IBasicResponse)=>
        {
          this.posts = response.data;
          if(!this.posts || this.posts.length === 0)
            this._uiService.setNewMessageStatus('Sin resultados',{});
        })
        .catch(error=>
          {
              this._uiService.setNewErrorStatus
              ('Eror al recuperar publicaciones', error);
          }
        )
    }
}
