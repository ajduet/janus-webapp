import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftSkillViolation } from '../../entities/softSkillViolation'

@Injectable()
export class SoftSkillsViolationService {

  constructor(private http : HttpClient) { }

  public timestampList : number[];
  public violationComments : string;
  public allViolations : SoftSkillViolation[];
  public selectedViolations : SoftSkillViolation[];


  selectViolations(newViolations : SoftSkillViolation[]){
    //Loop through newViolations and add any that are not already in selectedViolations.
    for(let i = 0; i < newViolations.length; i++ ){
      
    }
  }

  appendComment(comment : string){
    this.violationComments.concat(comment);
  }

  addTimestamp(){
    this.timestampList.push(Date.now());
  }

  deleteViolation(violationID: number){
      
  }


}
