import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { ViolationType } from '../../entities/violationType';

/*
Used to obtain the defined types of soft skill violations. 
Each time a screener flags a violation, 
they have the option to choose from a list of violation types. 
This is the service to obtain the types from the server in the form of an observable
*/
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