import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UiService } from '../../shared/services/ui.service';
import { ILoginResponse } from '../../auth/interfaces/loginResponse.interface';

const excludedUrls: string[] = [
    '/no-auth/',
    '/public/'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    if (isExcluded) {
        return next(req);
    }

    const authService = inject(AuthService);
    const uiService = inject(UiService);
    const a = uiService.getAuthentication();

    let autReq = req;
    if (a?.token) {
        autReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${a.token}`)
        });
    }

    return next(autReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if ((error.status === 401 || error.status === 403) && a?.refreshToken && 
                !req.url.includes('login') && 
                !req.url.includes('refresh-token')) {
                if (!authService.isRefreshing) {
                    return authService.refreshToken(a.refreshToken).pipe(
                        switchMap((newLogin: ILoginResponse) => {
                            authService.rememberUser(a.userName, newLogin.token, newLogin.userId, newLogin.refreshToken);
                            const clonedReq = req.clone({
                                headers: req.headers.set('Authorization', `Bearer ${newLogin.token}`)
                            });
                            return next(clonedReq);
                        }),
                        catchError(() => {
                            authService.logOut();
                            return throwError(() => new Error('Error al refrescar el token'));
                        })
                    );
                } else {
                    return authService.refreshTokenSubject.pipe(
                        filter(token => token !== null),
                        take(1),
                        switchMap((token) => {
                            const clonedReq = req.clone({
                                headers: req.headers.set('Authorization', `Bearer ${token}`)
                            });
                            return next(clonedReq);
                        })
                    );
                }
            }
            return throwError(() => error);
        })
    );
};