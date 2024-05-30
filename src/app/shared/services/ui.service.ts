import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStatus } from '../interfaces/status.interface';
import { IAuthentication } from '../interfaces/authentication.interface';
import { IZone } from '../../admin/interfaces/izone.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private siteStatus: any = new BehaviorSubject<IStatus>({} as IStatus);
  private accountStauts: any = new BehaviorSubject<IAuthentication>({} as IAuthentication);
  private zoneStatus: BehaviorSubject<IZone | undefined> = new BehaviorSubject<IZone | undefined>(undefined);

  constructor() {
    this.loadAuthentication();
   }

  onSiteStatusChanged(): Observable<IStatus>
  {
    return this.siteStatus.asObservable();
  }

  onAccountStatusChange(): Observable<IAuthentication>
  {
    return this.accountStauts.asObservable();
  }

  onZoneStatusChange(): Observable<IZone | undefined>
  {
    return this.zoneStatus.asObservable();
  }

  setNewState(state:IStatus):void
  {
    this.siteStatus.next(state);
  }

  setNewErrorStatus(message:string, data:any)
  {
    this.setNewState({code:500, message, data});
  }

  setNewMessageStatus(message:string, data:any)
  {
    this.setNewState({code:200, message, data});
  }

  loadAuthentication():void
  {
     let string = localStorage.getItem('auth');
     if(string && string !== '') 
     {
        let auth: IAuthentication = JSON.parse(string);
        this.accountStauts.next(auth);        
     }     
  }

  getAuthentication():IAuthentication
  {
    return this.accountStauts.value as IAuthentication;
  }

  setZoneStatus(zone:IZone | undefined):void
  {
    this.zoneStatus.next(zone);
  }

  getZone():IZone | undefined
  {
    return this.zoneStatus.value;
  }
  
  isAuthenticated():boolean
  {
    if(this.getAuthentication() && 
    this.getAuthentication().token && this.getAuthentication().token !== '')
      return true;
    else
      return false;
  }

  clearAuth()
  {        
    this.accountStauts.next({});
  }
}
