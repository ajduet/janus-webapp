import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {User} from '../domain/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserInfoService {


  constructor(private url: UrlService,
              private http: HttpClient) { }

  loadUser(): Observable<User> {
    return this.http.get<User>(this.url.getUrl() + '/auth/userinfo');
  }

  logout(): Observable<any> {
    return this.http.post(this.url.getUrl() + '/revokelogout', {});
  }

  getUser() {
// Added this spoofed user to better identify errors.
    const user: User = {
        id: '1',
        role: '1',
        nickname: '1',
        username: '1',
        firstname: '1',
        lastname: '1',
        picture: '1',
        thumbnail: '1'
      };
      localStorage.setItem('user', JSON.stringify(user));
// Code above this was added.
      return JSON.parse(localStorage.getItem('user'));
  }

  setUser(u: User) {
      localStorage.setItem('user', JSON.stringify(u));
  }


}
