import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Store, select } from '@ngrx/store';
import { AuthState, LogoutAuthAction } from './core/reducers/auth.store';
import { Router } from '@angular/router';

export const EXCLUDED_PATHS = [
  'assets/i18n'
]

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private apiKey: string;

  constructor(private store: Store<any>) {
    store.pipe(select('auth')).subscribe(
      (auth: AuthState) => {
        this.apiKey = auth.apiKey;
      }
    )
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string;
    let url = req.url;
    if(!this.pathExcluded(url)) {
      url = `/v3` + url;
    }
    return next.handle(req.clone({
      url,
      setHeaders: {
        "Authorization": "Basic "+btoa(`api:${this.apiKey}`)
      }
    }));
  }

  private pathExcluded(url: string): boolean {
    return !!EXCLUDED_PATHS.find(path => {
      return url.indexOf(path) != -1;
    })
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public store: Store<any>,
    public router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((err, caught) => {
        if (err instanceof HttpErrorResponse) {
          if(err.status == 401) {
            // this.store.dispatch(new LogoutAuthAction());
            // setTimeout(() => this.router.navigate(['/']), 0)
          }
          if(err.status >= 200 && err.status < 400) {
            return of(new HttpResponse<any>({
              body: err.error,
              headers: err.headers,
              status: err.status
            }));
          } else if(err.error && err.error.message) {
            // let snackBarRef = this.notifyService.error(err.error.details || err.error.message);
          } else if(typeof err.error == 'string') {
            // let snackBarRef = this.notifyService.error(err.error);
          }
        }
        return throwError(err);
      })
    )
  }
}
