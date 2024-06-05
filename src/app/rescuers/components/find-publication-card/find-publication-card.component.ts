import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Backend } from '../../../shared/constants/api.constant';
import { RescuersPaths } from '../../constants/rescuersPaths.constant';
import { UiService } from '../../../shared/services/ui.service';
import { PostStates } from '../../constants/posts.constants';
import { PostService } from '../../services/post.service';
import { IBasicResponse } from '../../../core/interfaces/responses/basicresponse.interface';

@Component({
  selector: 'app-find-publication-card',
  standalone: true,
  imports: [CommonModule,RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './find-publication-card.component.html',
  styleUrl: './find-publication-card.component.css'
})
export class FindPublicationCardComponent {

  @Input() post?:IPost;
  pathDetail = RescuersPaths.postAnimalDetail;
  isAdmin = false;
  postStates=PostStates;
  @Output() postStateChanged:EventEmitter<IPost> = new EventEmitter<IPost>();

  constructor(private _uiService:UiService,
    private _postService:PostService
  )
  {
    this.isAdmin = _uiService.isAdminAuthentication();
  }

  getUrlImage():string
  {
    if(this.post && this.post.image)
      return Backend.ResourcesUrl + 'animals/' + this.post?.image;
    else
      return '';
  }

  toRevision()
  {  
    if(this.post)
      {
          this._postService.changeStateToRevision(this.post)
            .then((response:IBasicResponse)=>
            {
              if(this.post)
                {
                  this.post.state = PostStates.Published;
                  this.postStateChanged.emit(this.post);
                }
            })
            .catch(error=>{
              this._uiService.setNewErrorStatus
              ('Error al cambiar de estado', error);
            })
      }
  }

  toPublish()
  {  
    if(this.post)
      {
          this._postService.changeStateToPublished(this.post)
            .then((response:IBasicResponse)=>
            {
              if(this.post)
                {
                  this.post.state = PostStates.Published;
                  this.postStateChanged.emit(this.post);
                }
            })
            .catch(error=>{
              this._uiService.setNewErrorStatus
              ('Error al cambiar de estado', error);
            })
      }
  }

  toRejectState()
  {  
    if(this.post)
      {
          this._postService.changeStateToRejected(this.post)
            .then((response:IBasicResponse)=>
            {
              if(this.post)
                {
                  this.post.state = PostStates.Rejected;
                  this.postStateChanged.emit(this.post);
                }
            })
            .catch(error=>{
              this._uiService.setNewErrorStatus
              ('Error al cambiar de estado', error);
            })
      }
  }
}
