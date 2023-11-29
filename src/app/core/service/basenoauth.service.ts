import { Injectable } from '@angular/core';
import { Backend } from '../../shared/constants/api.constat';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './baseservice.service';

@Injectable({
  providedIn: 'root'
})
export class BaseNoAuthService extends BaseServiceService {

    constructor(protected override _httpClient: HttpClient)
    {
      super(_httpClient);      
    }

}
