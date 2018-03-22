import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ViolationType } from '../../entities/violationType'

@Injectable()
export class SoftSkillsViolationService {

  constructor(private http : HttpClient) { }

  public timestampList : number[];
  public violationComments : string;
  public allViolations : ViolationType[];
  public selectedViolations : ViolationType[];


  selectViolations(newViolations : ViolationType[]){
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


}
