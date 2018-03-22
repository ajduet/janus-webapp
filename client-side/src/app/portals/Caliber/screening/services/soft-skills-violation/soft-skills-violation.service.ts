import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftSkillViolation } from '../../entities/softSkillViolation'

@Injectable()
export class SoftSkillsViolationService {

  constructor(private http : HttpClient) { }

  public timestampList : Date[];
  public violationComments : string;
  public allViolations : SoftSkillViolation[];
  public selectedViolations : SoftSkillViolation[];

  public userSoftSkillViolations : SoftSkillViolation[];

  addViolations(newViolations : SoftSkillViolation[], comments : string){
    //Loop through newViolations and add any that are not already in selectedViolations.
    let exists : boolean = false;
    let currentSoftSkillViolation : SoftSkillViolation;

    //Loop through the new violations
    for(let i = 0; i < newViolations.length; i++ ){
      exists = false;

      //Loop through the existing violations
      for(let j = 0; j < this.selectedViolationTypes.length; j++ ){

        //If the violation type already exists in the selectedViolationTypes array, set exists to true 
        if(newViolations[i].violationType === this.selectedViolationTypes[j].violationType){
          exists = true;
        }
      }

      //If the violation type is new, add it to the selectedViolationTypes array.
      if(!exists){
        this.selectedViolationTypes.push(newViolations[i]);
      }

      //Populate the currentSoftSkillViolation object
      currentSoftSkillViolation.violationType = newViolations[i];
      currentSoftSkillViolation.Comment = comments;
      currentSoftSkillViolation.Time = new Date();
      currentSoftSkillViolation.violationID = null;
      //Update when we decide where to save screeningID
      currentSoftSkillViolation.screeningID = null;

      //Add the SoftSkillViolation object to the list of the user's soft skill violations.
      this.userSoftSkillViolations.push(currentSoftSkillViolation);
    }
  }

  //Takes the selectedViolationTypes array and sends only an array of their IDs in a POST request.
  sendViolationIDs() {
    let violationIDArray : number[];
    for(let i = 0; i < this.selectedViolationTypes.length; i++){
      violationIDArray.push(this.selectedViolationTypes[i].violationID);
    }
    this.http.post('',violationIDArray);
  }

  appendComment(comment : string){
    this.violationComments.concat(comment);
  }

  addTimestamp(){
    this.timestampList.push(new Date());
  }

  deleteViolation(violationID: number){
      
  }


}
