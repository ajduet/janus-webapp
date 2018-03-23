import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftSkillViolation } from '../../entities/softSkillViolation'

@Injectable()
export class SoftSkillsViolationService {

  constructor(private http : HttpClient) { }

  public timestampList : Date[];
  public violationComments : string;
  public allViolations : SoftSkillViolation[];
  public selectedViolations : SoftSkillViolation[];
  readonly violationURL: string = "violation/delete";
  public userSoftSkillViolations : SoftSkillViolation[];

  getPreviousViolations(): Observable<SoftSkillViolation[]>{
    return this.http.get<SoftSkillViolation[]>(this.violationURL);
  }

  addViolations(newViolations : SoftSkillViolation[], comments : string[]){
    //Loop through newViolations and add any that are not already in selectedViolations.
    let exists : boolean = false;
    let currentSoftSkillViolation : SoftSkillViolation;

    //Loop through the new violations
    for(let i = 0; i < newViolations.length; i++ ){
      exists = false;

      //Loop through the existing violations
      for(let j = 0; j < this.selectedViolations.length; j++ ){

        //If the violation type already exists in the selectedViolations array, set exists to true 
        if(newViolations[i].violationType === this.selectedViolations[j].violationType){
          exists = true;
        }
      }

      //If the violation type is new, add it to the selectedViolationTypes array.
      if(!exists){
        this.selectedViolations.push(newViolations[i]);
      }

      //Populate the currentSoftSkillViolation object
      currentSoftSkillViolation.violationType = newViolations[i].violationType;
      currentSoftSkillViolation.Comment = comments[i];
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
    for(let i = 0; i < this.selectedViolations.length; i++){
      violationIDArray.push(this.selectedViolations[i].violationID);
    }
    this.http.post('',violationIDArray);
  }

  appendComment(comment : string){
    this.violationComments.concat(comment);
  }

  addTimestamp(){
    this.timestampList.push(new Date());
  }

  deleteViolation(violationID: number): Observable<SoftSkillViolation[]>{
    let params = new HttpParams().set('id', violationID.toString());
    return this.http.delete<SoftSkillViolation[]>(this.violationURL);
  }

  handleDelete404() {

  }

}
