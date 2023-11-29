import { Injectable } from '@angular/core';
import { Backend } from '../../shared/constants/api.constat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  protected baseUrl : string;
  protected nameSpace:string;

  constructor(protected _httpClient:HttpClient) {
    this.baseUrl = Backend.BaseUrl;
    this.nameSpace  = '';
   }

   getBaseUrlNameSpace():string
   {
      return this.baseUrl + this.nameSpace + '/';
   }
}
