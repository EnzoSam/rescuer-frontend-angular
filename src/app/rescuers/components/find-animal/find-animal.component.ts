import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFilterPanelComponent } from "../find-filter-panel/find-filter-panel.component";
import { FindAnimalListComponent } from "../find-animal-list/find-animal-list.component";
import { IFilter } from '../../interfaces/filter.interface'; // Asumo PostStates está aquí
import { IPost } from '../../interfaces/post.interface';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { UiService } from '../../../shared/services/ui.service';
import { PostService } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Importamos MatPaginator y PageEvent
import { CustomPaginatorIntl } from '../../../shared/components/material-paginator-intl';

// Asegúrate de que IBasicResponse.data contenga { posts: IPost[], totalCount: number }
export interface IPostResponseData {
  posts: IPost[];
  totalCount: number;
}

@Component({
    selector: 'app-find-animal',
    standalone: true,
    templateUrl: './find-animal.component.html',
    styleUrl: './find-animal.component.css',
    providers:[  { provide: MatPaginatorIntl, useValue: CustomPaginatorIntl() } ],
    imports: [
        CommonModule,
        MatButtonModule,
        FindFilterPanelComponent,
        FindAnimalListComponent,
        MatIconModule,
        MatSlideToggleModule,
        MatSidenavModule,
        RouterLink,
        MatPaginatorModule // Importamos MatPaginatorModule aquí para el standalone
    ]
})
export class FindAnimalComponent implements OnInit {

    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    posts: IPost[] = [];
    filterOpened: boolean = true;
    lastFilter: IFilter;
    lostMode: boolean = false;
    title: string;

    // Propiedades de paginación
    totalPosts: number = 0;
    currentPageIndex: number = 0;
    pageSize: number = 5;
    pageSizeOptions: number[] = [5, 10, 25, 50];

    constructor(
        private _postService: PostService,
        private _uiService: UiService,
        private _activatedRoute: ActivatedRoute,
        private _filterService: FilterService
    ) {
        this.title = 'Encontrá a tu nueva mascota';
        this.lastFilter = {
            ..._filterService.new(),
            pageIndex: this.currentPageIndex, 
            pageSize: this.pageSize,
        };
    }

    ngOnInit(): void {
        if (this._activatedRoute.data) {
            let { lost } = this._activatedRoute.snapshot.data;
            if (lost) {
                this.lostMode = lost;
                if (this.lostMode) {
                    this.title = 'Mascotas extraviadas';
                }
            }
        }
        this.lastFilter.lost = this.lostMode; 
        this.onFilterChanged(this.lastFilter);
    }

    refresh(): void {
        this.loadPostsWithCurrentFilter();
    }

    private loadPostsWithCurrentFilter(): void {
        this._postService.filter(this.lastFilter)
            .then((response: IBasicResponse) => {

                console.log(response)

                if (response.statusCode === 200 && response.data) {
                    const responseData = response.data as IPostResponseData;
                    this.posts = responseData.posts;
                    this.totalPosts = responseData.totalCount;
                    if (!this.posts || this.posts.length === 0) {
                        this._uiService.setNewMessageStatus('Sin resultados', {});
                    } else {
                        // Limpiar mensaje si hay resultados después de uno previo sin resultados
                       // this._uiService.clearMessageStatus();
                    }
                } else {
                    this.posts = [];
                    this.totalPosts = 0;
                    this._uiService.setNewMessageStatus('Error al cargar datos o datos vacíos', {});
                }
            })
            .catch(error => {
                this.posts = [];
                this.totalPosts = 0;
                this._uiService.setNewErrorStatus('Error al recuperar publicaciones', error);
            });
    }

    onFilterChanged(filter: IFilter): void {
        filter.lost = this.lostMode;
        this.lastFilter = filter;

        this.currentPageIndex = 0;
        this.lastFilter.pageIndex = this.currentPageIndex;

        this.loadPostsWithCurrentFilter(); 
    }

    onPageChange(event: PageEvent): void {
        this.currentPageIndex = event.pageIndex;
        this.pageSize = event.pageSize;

        this.lastFilter.pageIndex = this.currentPageIndex;
        this.lastFilter.pageSize = this.pageSize;

        this.loadPostsWithCurrentFilter(); 
    }
}