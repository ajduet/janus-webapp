import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { SkillType } from "../../entities/skillType";
import { SKILLTYPES } from "../../mock-data/mock-skillTypes";
import { UrlUtilService } from '../UrlUtil/url-util.service';

/*
Used to get the mock data to create mock candidates. 
Code exists in repository, but is being refactored in the Skill Type Bucket Service
*/
@Injectable()
export class SkillTypeService {
  private ROOT_URL: string = this.urlUtilService.getBase() + '/skilltype-service';
  private candidateSkillType: Observable<SkillType>;
  constructor(
    private httpClient: HttpClient,
    private urlUtilService: UrlUtilService,
  ) {}
  
  /*
  getSkillTypes(): Observable<SkillType[]> {
    return of(SKILLTYPES);
  }
  */

  // Returns an observable array of all skill types 
  getSkillTypes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.ROOT_URL + '/skillType/getSkillTypes/')
  }

  // getSkillTypes(): Observable<SkillType[]> {
  //   return this.httpClient.get<SkillType[]>(this.ROOT_URL + "/all.json");
  // }
}
