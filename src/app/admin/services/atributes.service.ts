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
      id:undefined,
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

  getById(_id:any): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
      (this.getBaseUrlNameSpace() + '' + _id)
        .subscribe((response:IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }  
    
  createOrUpdeate(atribute:IAtribute): Promise<IBasicResponse> {

    console.log(atribute)
    if(atribute.id)
      return this.update(atribute);
    else
      return this.create(atribute);
  } 

  update(atribute:IAtribute): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace(), atribute)
        .subscribe((response:IBasicResponse) => {
          console.log(response);
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

  delete(atribute:IAtribute): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete<IBasicResponse>
      (this.getBaseUrlNameSpace() + '' + atribute.id)
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