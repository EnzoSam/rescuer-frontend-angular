import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../../core/service/baseservice.service';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { IZone } from '../interfaces/izone.interface';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseServiceService {

  constructor(protected override _httpClient: HttpClient) {
    super(_httpClient);
    this.nameSpace = 'zones';
  }

  new():IZone
  {
    return {
        id:'',
        name:'',
        code:'',
        zoneType:'',
        idMasterZone: undefined
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

  create(zone:IZone): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), zone)
        .subscribe((response:IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }  

  delete(zone:IZone): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete<IBasicResponse>
      (this.getBaseUrlNameSpace() + '/' + zone.id)
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