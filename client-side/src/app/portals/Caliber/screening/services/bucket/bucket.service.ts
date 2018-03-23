import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Bucket } from '../../entities/bucket';
import { BUCKETS } from '../../mock-data/mock-buckets';

@Injectable()
export class BucketService {

  private ROOT_URL: string = "http://localhost:8080/bucket";
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });
  
  constructor(private httpClient: HttpClient) { }
  
  // getBuckets(): Observable<Bucket[]>{
  //   return this.httpClient.get<Bucket[]>(this.ROOT_URL + '/all');
  // }

  getBuckets(): Observable<Bucket[]> {
    return of(BUCKETS);
  }


}
