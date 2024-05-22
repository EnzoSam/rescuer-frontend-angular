import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../../core/service/baseservice.service';
import { IBasicResponse } from "../../core/interfaces/responses/basicresponse.interface";
import { IZone } from '../interfaces/izone.interface';
import { ZoneType } from '../constants/zones.constants';
import { UiService } from '../../shared/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseServiceService {

  constructor(protected override _httpClient: HttpClient,
    private _uiService:UiService
  ) {
    super(_httpClient);
    this.nameSpace = 'zones';    
  }

  new():IZone
  {
    return {
        id:undefined,
        name:'',
        code:'',
        zoneType:'',
        parentZoneId: undefined
    }
  }

  loadAppLocation()
  {
    this.getRoots()
    .then((response:IBasicResponse)=>
    {
        if(response.data.length > 0)
        {
          this._uiService.setZoneStatus(response.data.at(0));
        }
    });
    
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

  getRoots(): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'roots')
        .subscribe((response:IBasicResponse) => {
          resolve(response);            
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  createOrUpdeate(zone:IZone): Promise<IBasicResponse> {

    console.log(zone)
    if(zone.id)
      return this.update(zone);
    else
      return this.create(zone);
  } 

  update(zone:IZone): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
      (this.getBaseUrlNameSpace(), zone)
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

  create(zone:IZone): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IBasicResponse>
      (this.getBaseUrlNameSpace(), zone)
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

  delete(zone:IZone): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete<IBasicResponse>
      (this.getBaseUrlNameSpace() + '' + zone.id)
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

  getChildType(_zoneType:string):string
  {
    if(!_zoneType || _zoneType === '')
      return '';

    if(_zoneType === ZoneType.Country)
      return ZoneType.Province;
    else if(_zoneType === ZoneType.Province)
      return ZoneType.Town;
    else if(_zoneType === ZoneType.Town)
      return ZoneType.Neighborhood;  
    else
      return ZoneType.Location;        
  }

  getName(_zoneType:string):string
  {
    if(!_zoneType || _zoneType === '')
      return '';

    if(_zoneType === ZoneType.Country)
      return 'Pais';
    else if(_zoneType === ZoneType.Province)
      return 'Provincia';
    else if(_zoneType === ZoneType.Town)
      return 'Ciudad'; 
    else if(_zoneType === ZoneType.Neighborhood)
      return 'Barrio';       
    else
      return 'Zona';
  }

  getByParent(parentId:any): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
      (this.getBaseUrlNameSpace() + 'childs/' + parentId)
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