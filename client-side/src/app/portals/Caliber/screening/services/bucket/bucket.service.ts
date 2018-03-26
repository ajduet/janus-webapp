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
  // buckets necessary for conducting screening interview
  // the buckets contained in filteredBuckets are based on the 
  // skills selected from the candidates skills.
  private filteredBuckets: Bucket[];
  private allBuckets: Bucket[];
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });
  
  constructor(private httpClient: HttpClient) { }
  
  // getBuckets(skillTypeID: number): Observable<Bucket[]>{
            // change the url to match the service endpoint
  //   this.httpClient.post<Bucket[]>(this.ROOT_URL + `/${skillTypeID}`);
  // }

  getBuckets(): Observable<Bucket[]> {
    return of(BUCKETS);
  }

  // getBuckets(): Bucket[] {
  //   return this.filteredBuckets;
  // }

  setBuckets(buckets: Bucket[]): void {
    this.filteredBuckets = buckets;
  }
}
