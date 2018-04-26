import { Injectable } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorsService {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return next.handle(req);
  }
}
