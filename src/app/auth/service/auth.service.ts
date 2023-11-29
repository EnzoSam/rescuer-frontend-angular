import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login.interface';
import { IRegister } from '../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { BaseNoAuthService } from '../../core/service/basenoauth.service';
import { IInitRegisterResponse } from '../../core/interfaces/responses/initregister.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseNoAuthService{

  constructor(protected  override _httpClient: HttpClient)
  {
    super(_httpClient);
    this.nameSpace = 'auth';
  }

  newLogin():ILogin
  {
    return {
      email:'',
      password: ''
    };
  }

  newRegister():IRegister
  {
    return {
      email:''
    };
  }

  httpClient()
  {
  }

  initRegister(register:IRegister):Promise<IInitRegisterResponse>
  {
    return new Promise((resolve, reject)=>
    {
    this._httpClient.post<IInitRegisterResponse>(this.getBaseUrlNameSpace() + "register", register)
    .subscribe(response =>
      {
          resolve(response);
      },
      error=>
      {
        reject({statusCode:500, message:error})
      }            
    );
    });
  }
}
