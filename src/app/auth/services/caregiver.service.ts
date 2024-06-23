import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../../core/service/baseservice.service';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { ICaregiver } from '../interfaces/icaregiver.interface';
import { PostStates } from '../../rescuers/constants/posts.constants';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService extends BaseServiceService {

  constructor(protected override _httpClient: HttpClient
  ) {
    super(_httpClient);
    this.nameSpace = 'caregivers';
  }

  new():ICaregiver
  {
    return {
      id:undefined,
        userId:undefined,
        presentation:'',
        state:PostStates.Draft
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

  getByUserEmail(_email:string): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'byuseremail/' + _email)
        .subscribe((response:IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }  
    
  createOrUpdeate(_caregiver:ICaregiver): Promise<IBasicResponse> {

    if(_caregiver.id)
      return this.update(_caregiver);
    else
      return this.create(_caregiver);
  } 

  update(_caregiver:ICaregiver): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace(), _caregiver)
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

  create(_caregiver:ICaregiver): Promise<IBasicResponse> {

    console.log(this.getBaseUrlNameSpace())
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), _caregiver)
        .subscribe((response:IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }  

  delete(_caregiver:ICaregiver): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete<IBasicResponse>
      (this.getBaseUrlNameSpace() + '' + _caregiver.id)
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