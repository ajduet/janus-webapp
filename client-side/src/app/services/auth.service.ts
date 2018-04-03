import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  userProfile: any;
  requestedScopes: string = 'openid profile read:batches'
  refreshSub: Subscription;




  constructor(private router: Router) { }

  auth0Client = new auth0.WebAuth({
    clientID: environment.clientId,
    domain: environment.authDomain,
    apiAudience: environment.apiAudience,
    responseType: 'token id_token',
    redirectUri: 'https://localhost:4200/callback',
    scope: this.requestedScopes
  });

  public login() {
    this.auth0Client.authorize();
  }

  public handleAuthentication(): void {
    this.auth0Client.parseHash((err, authResult)=>{
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate['/home']
      } else if(err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult) {

    console.log(authResult);
    //Set the time the access toke will expire
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());


    //Set the scopes to provided scopes || requested scopes || ''
    const scopes = authResult.scope || this.requestedScopes || '';

    const namespace = environment.authNamespace;

    const roles = authResult.idTokenPayload[namespace + 'roles'] || '';
    const groups = authResult.idTokenPayload[namespace + 'groups'] || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('groups', JSON.stringify(groups));
    this.scheduleRenewal();
  }

  public logout(): void {
    //remove tokes and expiry time
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('roles');
    localStorage.removeItem('groups');

    this.unscheduleRenewal();

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    //Check whether the current time past the
    //Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public userIsInGroup(group: string) {}

  public userHasRole(expectedRoles: Array<String>): boolean {
    let roles = JSON.parse(localStorage.getItem('roles'));
    let included: boolean = roles.some(role => expectedRoles.includes(role));
    return included;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    
    const self = this;
    this.auth0Client.client.userInfo(accessToken, (err, profile)=>{
      if(profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public renewToken() {
    this.auth0Client.checkSession({
      audience: environment.apiAudience
    }, (err, authResult)=>{
      if(!err) {
        this.setSession(authResult);
      }
    });
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {
        const now = Date.now();

        //renew 30 seconds before expire
        let refreshAt = expiresAt - (1000 * 30);
        return Observable.timer(Math.max(1, refreshAt - now));
      });

      //when the delay fires
      //get a new token and schedule another renew
      this.refreshSub = source.subscribe(()=>{
        this.renewToken();
      });
  }

  public unscheduleRenewal() {
    if(!this.refreshSub) return;
    this.refreshSub.unsubscribe();
  }
}
