import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UiService } from '../../shared/services/ui.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

const excludedUrls: string[] = [
  '/no-auth/', 
  '/public/'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const isExcluded = excludedUrls.some(url => req.url.includes(url));
  if (isExcluded) {
    return next(req);
  }

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
        //_tokenService.setNewErrorStatus('No autorizado', err);
        return throwError(() => new Error('No autorizado'));
      }
      else
      {
        return throwError(() => err);
      }
      
    })
  );
  
};