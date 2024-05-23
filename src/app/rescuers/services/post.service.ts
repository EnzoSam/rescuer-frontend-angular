import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { Animal } from '../models/animal.model';
import { BaseAuthService } from '../../core/service/baseAuth.service';
import { AnimalService } from './animal.service';
import { IFilter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseAuthService {

  constructor(protected override _httpClient: HttpClient,
    private _animalService:AnimalService
  ) {
    super(_httpClient);
    this.nameSpace = 'posts';
  }

  filter(filter:IFilter | undefined): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), filter)
        .subscribe((response:IBasicResponse) => {

          let posts = [];
          
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }    
}