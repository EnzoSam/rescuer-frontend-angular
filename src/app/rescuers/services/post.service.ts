import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { BaseAuthService } from '../../core/service/baseAuth.service';
import { IFilter } from '../interfaces/filter.interface';
import { IPost } from '../interfaces/post.interface';
import { ContentsType } from '../constants/posts.constants';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseAuthService {

  constructor(protected override _httpClient: HttpClient) {
    super(_httpClient);
    this.nameSpace = 'posts';
  }

  filter(filter:IFilter | undefined): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), filter)
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }
  
  changeStateToPublished(post:IPost): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'topublished', 
      {
        id:post.id,
        contentType:post.contentType
      })
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  changeStateToRejected(post:IPost): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'toreject', 
      {
        id:post.id,
        contentType:post.contentType
      })
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }  

  changeStateToArchive(postId:any, newState:ContentsType): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'toarchive', 
      {
        id:postId,
        contentType:newState
      })
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }   

  changeStateToRevision(post:IPost): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'torevision', 
      {
        id:post.id,
        contentType:post.contentType
      })
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }   
}