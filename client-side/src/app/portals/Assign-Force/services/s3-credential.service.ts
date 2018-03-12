import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';

@Injectable()
export class S3CredentialService {

  constructor(private http: HttpClient,
    private urlService: UrlService) { }

  getCreds(): Observable<any> {
    return this.http.get<any>(
      this.urlService.getUrl() + '/api/trainer/api/v2/s3Creds');
  }
}
