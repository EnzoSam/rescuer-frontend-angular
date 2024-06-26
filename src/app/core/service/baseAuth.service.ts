import { Injectable } from '@angular/core';
import { Backend } from '../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './baseservice.service';

@Injectable({
  providedIn: 'root'
})
export class BaseAuthService extends BaseServiceService {

    constructor(protected override _httpClient: HttpClient)
    {
      super(_httpClient);      
    }

}
