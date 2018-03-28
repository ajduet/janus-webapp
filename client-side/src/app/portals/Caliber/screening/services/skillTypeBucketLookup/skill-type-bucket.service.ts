import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { SkillTypeBucketLookUp } from '../../entities/skillTypeBucketLookup';
import { SKILL_TYPE_BUCKET_LOOKUP } from '../../mock-data/mock-skillTypeBucketLookup';
import { UrlUtilService } from '../UrlUtil/url-util.service';

/*
Used to move the data for buckets and their related weights. 
Overall score for the evaluation is a weighted average of the scores for each bucket.
*/
@Injectable()
export class SkillTypeBucketService {
  private ROOT_URL: string = this.urlUtilService.getBase() + "/skilltype-service/skillType/getSkillTypeBucketsWithWeights";
  constructor(private httpClient: HttpClient,
    private urlUtilService: UrlUtilService) { }

  bucketsByWeight: SkillTypeBucketLookUp;

  
  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return this.httpClient.get<SkillTypeBucketLookUp>(this.ROOT_URL + `/${skillTypeID}`);
  }
  
/*
  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return of(SKILL_TYPE_BUCKET_LOOKUP);
  }
*/

}
