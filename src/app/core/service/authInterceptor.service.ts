import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiService } from '../../shared/services/ui.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _tokenService: UiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let autReq = req;
        let a = this._tokenService.getAuthentication();
        if (a) {
            const token = a.token;
            if (token && token != '') {
                autReq = req.clone({ headers: req.headers.set('Authorization', token) });
            }
        }

        return next.handle(autReq).pipe(
            catchError((requestError: HttpErrorResponse) => {
                this._tokenService.setNewErrorStatus('No autorizado', requestError);
                return next.handle(autReq);
            })
        );
    }
}
