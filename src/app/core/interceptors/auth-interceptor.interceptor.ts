import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UiService } from '../../shared/services/ui.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _tokenService = inject(UiService);
  let autReq = req;
  let a = _tokenService.getAuthentication();
  if (a && a.token && a.token != '') {
      autReq = req.clone(
        
        { headers: req.headers.set('Authorization', 'Bearer ' + a.token) }
      );
  }  

  return next(autReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        _tokenService.setNewErrorStatus('No autorizado1', err);
        return throwError(() => new Error('Unauthorized Exception'));
      }
      else
      {
        return throwError(() => err);
      }
      
    })
  );
  
};