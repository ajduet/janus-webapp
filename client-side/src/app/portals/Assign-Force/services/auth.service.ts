import {Injectable} from '@angular/core';
import {UrlService} from './url.service';

/** AuthService manages the logged in token saved on the local system.
   This is used to prevent unecessary re-authorization traffic to and
   from the server */

@Injectable()
export class AuthService {

  constructor(private url: UrlService) {
  }

  /** getToken returns the current, local login token */
  getToken() {
      return localStorage.getItem('token');
  }

  /** setToken sets the local token so that other apps know they are logged in or not */
  setToken(newToken: string) {

      localStorage.setItem('token', newToken);
  }
}
