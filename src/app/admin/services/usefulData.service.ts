import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../../core/service/baseservice.service';
import { IAtribute } from '../interfaces/iatribute.interface';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { IUsefulData } from '../interfaces/iusefulData.interface';

@Injectable({
  providedIn: 'root'
})
export class UseflDataService extends BaseServiceService {

  constructor(protected override _httpClient: HttpClient) {
    super(_httpClient);
    this.nameSpace = 'usefuldata';
  }

  new():IUsefulData
  {
    return {
      id:undefined,
        data:'',
        description:'',
        contacts:[]
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
    
  createOrUpdeate(atribute:IUsefulData): Promise<IBasicResponse> {

    console.log(atribute)
    if(atribute.id)
      return this.update(atribute);
    else
      return this.create(atribute);
  } 

  update(atribute:IUsefulData): Promise<IBasicResponse> {
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

  create(atribute:IUsefulData): Promise<IBasicResponse> {
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

  delete(atribute:IUsefulData): Promise<IBasicResponse> {
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