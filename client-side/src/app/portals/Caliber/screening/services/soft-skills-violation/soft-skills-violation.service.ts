import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SoftSkillViolation } from '../../entities/softSkillViolation'
import { ViolationType } from '../../entities/violationType';
import { MOCK_VIOLATIONS } from '../../mock-data/mock-violations';
import { UrlUtilService } from '../UrlUtil/url-util.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
Separate from but related to the Soft Skills service, 
this is used to create / read / delete flags for soft skill violations. 
Each time the screener flags a violation, this service is invoked
*/
@Injectable()
export class SoftSkillsViolationService {

  constructor(
    private http : HttpClient,
    private urlUtilService: UrlUtilService
  ) { }

  headers = new HttpHeaders({
    "Content-type": "application/json"
  });
  
  softSkillViolations: any[] = [];
  // questionsQuestionsSource tracks the value of answeredQuestions
  // and allows values to be sent to answeredQuestions
  private softSkillViolationSource = new BehaviorSubject<any[]>(this.softSkillViolations);
  // used to retrieve populate answeredQuestions in the data table component
  // and answer modal component
  currentSoftSkillViolations = this.softSkillViolationSource.asObservable();

  // readonly because why wouldn't they be? 
  readonly getViolationTypeURL: string = this.urlUtilService.getBase() + "/violation/all"
  readonly getViolationURL: string = this.urlUtilService.getBase() + "/screening-service/screening/violation/";
  readonly addViolationURL: string = this.urlUtilService.getBase() + "/screening-service/violation/flag";
  readonly deleteViolationURL: string = this.urlUtilService.getBase() + "/screening-service/violation/delete/";

  /*
  // Real endpoint for future use
  getPreviousViolations(screeningID: number): Observable<SoftSkillViolation[]>{
    // Returning an observable because the relevant template uses the async pipe in the binding
    return this.http.get<SoftSkillViolation[]>(this.getViolationURL + `?screeningID=${screeningID.toString()}`);
  }
  */

  // Fake local data for temp use
  getPreviousViolations(screeningID: number): Observable<SoftSkillViolation[]>{
    return this.http.get<SoftSkillViolation[]>(this.getViolationURL + screeningID);
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
      violationIdArray[i] = newViolations[i].violationTypeId;
    }

    // create an Http parameter body with violationID array, append comment and date to body
    let params = new HttpParams().set('ids', violationIdArray.toLocaleString());
    params.append('comment', comment);
    params.append('date', new Date().toDateString());

    // send post request 
    this.http.post(this.addViolationURL, { params });
  }

  // Submit a violation with the appropriate comment, screening ID and timestamp.
  submitViolation(typeID: number, comment: string, screeningID: number ): Observable<SoftSkillViolation[]> {
    return this.http.post<any[]>(
      this.addViolationURL,
      {
        "violationTypeId": [typeID],
        "softSkillComment": comment,
        "violationTime": new Date(),
        "screeningId": screeningID
      },
      { headers: this.headers }
    );
  }

  deleteViolation(violationID: number): Observable<any[]>{
    /*
      Once the screener has completed the question-asking portion, they are directed 
      to a new component that allows them to view all flagged violation, add a new violation, 
      and delete a violation that is listed. 

      This method sends the delete request, and it returns an observable because the relevant 
      template (the html file) uses the async pipe to display the violations. The use of the async
      pipe requires the binding of an observable in the template, but allows the template to be changed
      in response to a change in the observable. Hence, deleteViolation returns an Observable. 
    */
    return this.http.get<any[]>(this.deleteViolationURL+violationID);
  }

  updateSoftSkillViolations(softSkillviolations: any[]){
    this.softSkillViolationSource.next(softSkillviolations);
  }

}
