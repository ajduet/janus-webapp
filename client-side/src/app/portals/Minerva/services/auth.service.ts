import { Injectable } from '@angular/core';

/* Services */
import { UrlService } from './url.service';

/**
 * AuthService manages the logged in token saved on the local system.
 * This is used to prevent unecessary re-authorization traffic to and
 * from the server
 */

@Injectable()
export class AuthService {

  constructor(private url: UrlService) { }

  /*
  =====================
    BEGIN: API calls
  =====================
  */

  /**
   * Returns the current, local login token
   */
  getToken() {
      return localStorage.getItem('token');
  }

  /**
   * Sets the local token so that other apps know they are logged in or not
   */
  setToken(newToken: string) {
      localStorage.setItem('token', newToken);
  }
}
