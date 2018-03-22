import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Bucket } from '../../entities/bucket';
import { BUCKETS } from '../../mock-data/mock-buckets';

@Injectable()
export class BucketService {

  getBuckets(): Observable<Bucket[]> {
    return of(BUCKETS);
  }

  constructor() { }

}
