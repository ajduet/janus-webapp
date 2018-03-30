import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import{ Subject } from 'rxjs/Subject';

import { Bucket } from '../entities/Bucket';

const httpOptions = {
    headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

@Injectable()
export class BucketsService {

  /** This is our base URL endpoint */
  // url: string = "/bucket/";
  url: string = "https://hydra-gateway-service.cfapps.io/bucket-service/bucket/";
  /** Making an Observable */
  bucketSubject = new Subject();
  routingToAllBuckets:boolean = false;
  /** For development only */

  private currentBucket: Bucket;

  constructor(private http: HttpClient) {}

  /** Gets all of company's buckets from server */
  getAllBuckets(): Observable<Bucket[]>{
      return this.http.get<Bucket[]>(this.url + "getBuckets");
  }

  /* getSkillTypes():Observable<SkillType[]> {
        return this.http.get<SkillType[]>(this.url + "getSkillTypes");
    }

   */
  getBucketById(bucketId: number){
      return this.http.get(this.url + bucketId);
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateBucket (bucket: Bucket) {
    return this.http.post(this.url + "updateBucket", bucket, httpOptions).toPromise();
    // return this.http.post(this.url + "updateBucket", bucket, httpOptions).toPromise();
  }

  /** POST: add a new bucket to the database */
  createNewBucket(bucket: Bucket): Observable<Bucket> {
      return this.http.post<Bucket>(this.url + "createBucket", bucket, httpOptions);
  }

  setBucket(bucket:Bucket){
     this.currentBucket=bucket;
  }

  getCurrentBucket():Bucket {
     if(this.currentBucket!=null){
         return this.currentBucket;
     }
  }

  setName(name:string){
      this.currentBucket.bucketCategory=name;
  }

  getName(id:number){
      return this.currentBucket.bucketCategory;
  }

  setDescription(desc:string){
      this.currentBucket.bucketDescription=desc;
  }

  getDescription(){
      return this.currentBucket.bucketDescription;
  }

}
