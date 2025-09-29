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
import { IUser } from '../interfaces/iuser.interface';
import { ContactsType } from '../../shared/constants/contact.constant';
import { ContactService } from '../../shared/services/contact.service';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseNoAuthService {

  isRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);


  constructor(protected override _httpClient: HttpClient,
    private _iuService: UiService,
    private _contactService: ContactService) {
    super(_httpClient);
    this.nameSpace = 'auth';

    _iuService.onAccountStatusChange().subscribe
      ((auth: IAuthentication) => {
        this.getRoles().then
          ((roles: number[]) => {
            auth.roles = roles;
          })
      });
  }

  newUser(): IUser {
    return {
      id: '',
      name: '',
      lastName: '',
      email: '',
      image: '',
      contacts: [],
      zoneId:3
    };
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

  rememberUser(userName: string, token: string,
     userId: string, refreshToken:string) {
    let auth: IAuthentication = {
      userName,
      token,
      refreshToken,
      userId,
      roles: []
    };
    localStorage.setItem('auth', JSON.stringify(auth));
    this._iuService.loadAuthentication();
  }

  logOut() {

    const currentAuth = this._iuService.loadAuthentication();
    localStorage.removeItem('auth');
    this._iuService.clearAuth();
    if(currentAuth && currentAuth.refreshToken)
    this._httpClient.post
        (this.getBaseUrlNameSpace() + "no-auth/logout", 
         { refreshToken : currentAuth.refreshToken})
         .subscribe((response:any)=>{
          console.log(response);
         },
        error=>{
          console.log('no logout');
        });
  }

  requestResetPassword(email: string): Promise<IResult> {
    return new Promise((resolve, reject) => {
      this._httpClient.post<IResult>
        (this.getBaseUrlNameSpace() + "no-auth/request-reset-password",
          {
            email
          })
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
          }
        );
    });
  }

  changePassword(email: string, token: string, newPassword: string): Promise<IResult> {
    return new Promise((resolve, reject) => {

      let req = {
        email, token, newPassword
      };

      this._httpClient.post<IResult>
        (this.getBaseUrlNameSpace() + "no-auth/change-password", req)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error)
          }
        );
    });
  }

  getById(_id: any): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
        (this.getBaseUrlNameSpace() + '' + _id)
        .subscribe((response: IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  getByUserEmail(_email: any): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
        (this.getBaseUrlNameSpace() + 'byemail/' + _email)
        .subscribe((response: IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  getRoles(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<IBasicResponse>
        (this.getBaseUrlNameSpace() + 'roles')
        .subscribe((response: IBasicResponse) => {
          resolve(response.data);
        },
          error => {
            reject('')
          }
        );
    });
  }

  updateUser(_user: IUser): Promise<IBasicResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.put<IBasicResponse>
        (this.getBaseUrlNameSpace(), _user)
        .subscribe((response: IBasicResponse) => {
          resolve(response);
        },
          error => {
            reject({ statusCode: 500, message: error })
          }
        );
    });
  }

  addWhatsappContact(_user: IUser, _whatsapp: string) {
    if (!_user.contacts)
      _user.contacts = [];

    let wc = _user.contacts.find(c => c.type === ContactsType.Whatsapp);
    if (wc) {
      if(!_whatsapp || _whatsapp === '')
        _user.contacts = _user.contacts.filter(c=>c!=wc);
      else
        wc.contact = _whatsapp;
    }
    else if(_whatsapp && _whatsapp !== ''){
      wc = this._contactService.new();
      wc.type = ContactsType.Whatsapp;
      wc.contact = _whatsapp;
      _user.contacts.push(wc);
    }
  }

    refreshToken(refreshToken: string): Observable<ILoginResponse> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.asObservable();
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this._httpClient.post<ILoginResponse>
        (this.getBaseUrlNameSpace() + "no-auth/refresh-token", 
        {refreshToken})
      .pipe(
        tap((response) => {
          this.refreshTokenSubject.next(response);
        }),
        finalize(() => {
          console.log('finalizo refresh token');
          this.isRefreshing = false;
        })
      );
  }
}