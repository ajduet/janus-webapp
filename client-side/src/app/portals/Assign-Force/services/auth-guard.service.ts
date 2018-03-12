import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Service for authenticating with AuthService and telling Janus applications
   if they are already logged in. */

@Injectable()
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) {}

  /** Returns true if user is currently logged in */
  canActivate(): boolean {
    return true; // For Testing.

    /* Commented out for Development and Testing.

      if (this.auth.getToken()) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    */
  }
}
