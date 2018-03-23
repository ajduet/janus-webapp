import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SoftSkillViolation } from '../../entities/softSkillViolation'
import { ViolationType } from '../../entities/violationType';
import { MOCK_VIOLATIONS } from '../../mock-data/mock-violations';

@Injectable()
export class SoftSkillsViolationService {

  constructor(private http : HttpClient) { }

  // readonly because why wouldn't they be? 
  readonly getViolationTypeURL: string = "/violation/all"
  readonly getViolationURL: string = "/screening/violation";
  readonly addViolationURL: string = "/violation/flag";
  readonly deleteViolationURL: string = "/violation/delete";

  /*
  // Real endpoint for future use
  getPreviousViolations(screeningID: number): Observable<SoftSkillViolation[]>{
    // Returning an observable because the relevant template uses the async pipe in the binding
    return this.http.get<SoftSkillViolation[]>(this.getViolationURL + `?screeningID=${screeningID.toString()}`);
  }
  */

  // Fake local data for temp use
  getPreviousViolations(screeningID: number): Observable<SoftSkillViolation[]>{
    return of(MOCK_VIOLATIONS);
  }
  
  addViolations(newViolations : ViolationType[], comment : string){
    /*
      Screener can use a UI element to select multiple types of violation in the same element
      (like using checkboxes or toggle switches). In this UI element, there is a single comment box.
      Each of these checkboxes / toggle switches are stored in the DB as separate rows, and every time 
      the method is called, the string within the comment box is duplicated into each row. 
      
      This is why the comment is a single string, but the ViolationType is an array - the comment
      will be duplicated across the array. 
    */
    let violationIdArray: number[];
    for(let i = 0; i < newViolations.length; i++){
      violationIdArray[i] = newViolations[i].violationID;
    }

    // create an Http parameter body with violationID array, append comment and date to body
    let params = new HttpParams().set('ids', violationIdArray.toLocaleString());
    params.append('comment', comment);
    params.append('date', new Date().toDateString());

    // send post request 
    this.http.post(this.addViolationURL, { params });
  }

  deleteViolation(violationID: number): Observable<SoftSkillViolation[]>{
    /*
      Once the screener has completed the question-asking portion, they are directed 
      to a new component that allows them to view all flagged violation, add a new violation, 
      and delete a violation that is listed. 

      This method sends the delete request, and it returns an observable because the relevant 
      template (the html file) uses the async pipe to display the violations. The use of the async
      pipe requires the binding of an observable in the template, but allows the template to be changed
      in response to a change in the observable. Hence, deleteViolation returns an Observable. 
    */
    let params = new HttpParams().set('id', violationID.toString());
    return this.http.delete<SoftSkillViolation[]>(this.deleteViolationURL, { params });
  }

}
