import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    headerName = 'X-AUTH-TOKEN';

    constructor(private auth: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.getToken();
      // Be careful not to overwrite an existing header of the same name.
      if (token !== null && !req.headers.has(this.headerName)) {
         req = req.clone({headers: req.headers.set(this.headerName, token)});
      }
      return next.handle(req);
   }
}
