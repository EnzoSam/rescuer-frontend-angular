import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../../core/service/baseservice.service';
import { IAtribute } from '../interfaces/iatribute.interface';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class AtributeService extends BaseServiceService {

  constructor(protected override _httpClient: HttpClient) {
    super(_httpClient);
    this.nameSpace = 'atributes';
  }

  new():IAtribute
  {
    return {
        name:'',
        group:'',
        image:''
    }
  }

  getAll(): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
      (this.getBaseUrlNameSpace())
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  create(atribute:IAtribute): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), atribute)
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