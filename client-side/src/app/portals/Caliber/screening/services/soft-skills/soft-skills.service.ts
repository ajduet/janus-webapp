import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { ViolationType } from '../../entities/violationType';

@Injectable()
export class SoftSkillsService {

  constructor(private http : HttpClient) { }

  public sampleViolationTypes: ViolationType[];

  public violationTypeList$ : Observable<ViolationType[]>;

  //Saves only the ViolationType IDs in an array 
  public checkedViolationIDList: number[];



  getAllViolationTypes(){
    this.violationTypeList$ = this.http.post<ViolationType[]>('<endpoint>/ViolationType/all', {});
    return this.violationTypeList$;
  }

  getAllTestSoftSkillViolations(): ViolationType[]{

    this.sampleViolationTypes = [];
    
    this.sampleViolationTypes[0] = {violationID : 0, violationType : "Cursing"};
    this.sampleViolationTypes[1] = {violationID : 1, violationType : "Attire"};
    this.sampleViolationTypes[2] = {violationID : 2, violationType : "Quiet"};
    this.sampleViolationTypes[3] = {violationID : 3, violationType : "Rode in on a horse."};

    return this.sampleViolationTypes;
  }

}