import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViolationType } from '../../entities/violationType';
import { VIOLATION_TYPES } from '../../mock-data/mock-violationTypes';
import { of } from 'rxjs/observable/of';
import { UrlUtilService } from '../UrlUtil/url-util.service';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ViolationTypeService {

  // getViolationTypes(): Observable<ViolationType[]> {
  //   return of(VIOLATION_TYPES);
  // }

  
  private ROOT_URL: string = this.urlUtilService.getBase();

  constructor(private http: HttpClient, 
              private urlUtilService: UrlUtilService) { }

  getViolationTypes(): Observable<ViolationType[]> {
    return this.http.get<ViolationType[]>(this.ROOT_URL+'/screening-service/violation/all', {});
  }
}