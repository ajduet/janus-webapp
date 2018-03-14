import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UrlService {

    url = 'http://localhost:8081';

    constructor(private http: HttpClient) { }

    /** Returns the current URL listed in this file */
    getUrl(): string {
      return this.url;
    }

    /*
    testCors1(): Observable<any> {
      return this.http.get(this.url);
    }
    testCors2(): Observable<any> {
      return this.http.get(this.url + '/auth/userinfo');
    }
    */
}
