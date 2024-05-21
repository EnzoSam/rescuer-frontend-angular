import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login.interface';
import { IRegister } from '../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { BaseNoAuthService } from '../../core/service/basenoauth.service';
import { IInitRegisterResponse } from '../interfaces/initregister.interface';
import { ILoginResponse } from '../interfaces/loginResponse.interface';
import { IResult } from '../../shared/interfaces/basicResult.interface';
import { IAuthentication } from '../../shared/interfaces/authentication.interface';
import { UiService } from '../../shared/services/ui.service';
import { IBasicResponse } from '../../core/interfaces/responses/basicresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseNoAuthService {

  constructor(protected override _httpClient: HttpClient,
    private _iuService:UiService) {
    super(_httpClient);
    this.nameSpace = 'auth';
  }

  newLogin(): ILogin {
    return {
      email: '',
      password: ''
    };
  }

  newRegister(): IRegister {
    return {
      email: '',
      name: '',
      lastName: '',
      password: ''
    };
  }

  httpClient() {
  }

  initRegister(register: IRegister): Promise<IInitRegisterResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IInitRegisterResponse>
      (this.getBaseUrlNameSpace() + "no-auth/register", register)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  login(login: ILogin): Promise<ILoginResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<ILoginResponse>
      (this.getBaseUrlNameSpace() + "no-auth/login", login)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
          }
        );
    });
  }

  validateMail(email: string, token: string): Promise<IResult> {
    return new Promise((resolve, reject) => {
      let validation = { email, token };
      this._httpClient.post<IResult>
      (this.getBaseUrlNameSpace() + "no-auth/confirm-email", validation)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
          }
        );
    });
  }

  rememberUser(userName:string, token:string)
  {
      let auth:IAuthentication = {
        userName,
        token
      };
      console.log(auth);
      localStorage.setItem('auth', JSON.stringify(auth));
      this._iuService.loadAuthentication();
  }

  logOut()
  {    
    localStorage.removeItem('auth');
    this._iuService.clearAuth();
  }

  requestResetPassword(email: string): Promise<IResult> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IResult>
      (this.getBaseUrlNameSpace() + "no-auth/request-reset-password",{})
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
          }
        );
    });
  }

  changePassword(email: string, token:string, newPassword:string): Promise<IResult> {
    return new Promise((resolve, reject) => {

      let req = {
        email, token, newPassword
      };

      this._httpClient.post<IResult>
      (this.getBaseUrlNameSpace() + "no-auth/change-password",req)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
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
}
