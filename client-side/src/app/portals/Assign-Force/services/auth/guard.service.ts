import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UrlService } from '../url/url.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(public router: Router, private urlService: UrlService) {}

  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}
