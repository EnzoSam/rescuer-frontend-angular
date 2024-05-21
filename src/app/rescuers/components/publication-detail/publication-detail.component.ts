import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { AnimalService } from '../../services/animal.service';
import { ActivatedRoute } from '@angular/router';
import { RouterPathParams } from '../../../shared/constants/routesPaths.constant';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';
import { Animal } from '../../models/animal.model';
import { UiService } from '../../../shared/services/ui.service';
import { Backend } from '../../../shared/constants/api.constant';
import { AuthService } from '../../../auth/services/auth.service';
import { PostUserDetailComponent } from '../post-user-detail/post-user-detail.component';

@Component({
  selector: 'app-publication-detail',
  standalone: true,
  imports: [CommonModule,PostUserDetailComponent],
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.css'
})
export class PublicationDetailComponent implements OnInit {

  post?: Animal;

  constructor(private _animalService:AnimalService,
    private _activateRoute:ActivatedRoute,
    private _uiService:UiService
  ) {

  }
  ngOnInit(): void {
  
    if (this._activateRoute.snapshot.paramMap.has(RouterPathParams.id)) {
      this._activateRoute.params.subscribe(params => {
        const idParam = params[RouterPathParams.id];        
        if(idParam && idParam != '')
        {
            this.load(idParam);
        }
      });
    }
  }

  load(id:any)
  {
    this._animalService.getById(id)
    .then((response:IBasicResponse)=>
    {
      this.post = response.data;
    }).catch(error => {
      this._uiService.setNewErrorStatus(error.message, error);
    });
  }

  getUrlImage():string
  {
    if(this.post && this.post.image)
      return Backend.ResourcesUrl + 'animals/' + this.post?.image;
    else
      return '';
  }
}
