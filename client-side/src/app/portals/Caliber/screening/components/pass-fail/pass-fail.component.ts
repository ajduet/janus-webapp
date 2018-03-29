import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { HttpParams } from '@angular/common/http';
import { ScreeningService } from '../../services/screening/screening.service';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})

/*
Once the question-and-answer phase has been completed, 
the screener is directed to this component. 
All violation flags specified are listed in a table, 
where the flag can be removed if desired. 
Screener is able to add any additional flags needed, 
and is able to provide optional feedback for candidate's soft skills overall.

The screener must specify if the candidate passed or failed the 
soft skills portion of the interview before they can view the final summary.
*/

export class PassFailComponent implements OnInit {

  //Candidate Name
  public candidateName: string;
  previousViolations: Observable<SoftSkillViolation[]>;
  private passed: boolean;
  violations:any[] = [];  //Needs to be Observable<any[]>
  endScreening = false;
  public disabled = true;
  public passChecked: boolean;
  public failChecked: boolean;
  public hasChecked: boolean;
  private screeningID: number;

  public softSkillFeedback: string;

  // need a SoftSkillViolationService to get the data
  constructor(private violationService: SoftSkillsViolationService,
              private screeningService: ScreeningService,
              private simpleTraineeService: SimpleTraineeService,
              private violationTypeService: ViolationTypeService,
              public softSkillViolationService: SoftSkillsViolationService
  ) {
  }

  ngOnInit() {
    this.disabled = true;
    this.passChecked = false;
    this.failChecked = false;
    let violationArray: any[] = [];
    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    this.previousViolations = this.getViolations();
    this.previousViolations.subscribe(data => console.log(data));
    this.violationTypeService.getAllViolationTypes().subscribe(violationTypes => {
        this.getViolations().subscribe(data => {
          // e = our violations
          for (let e of data) {
            // v = all violation types
            for (let v of violationTypes) {
              if (e.violationID == v.violationID) {
                let thisTime = e.Time;
                let thisComment = e.Comment;
                violationArray.push ({
                  violationType: { violationType: v.violationTypeText },
                  Time: thisTime,
                  Comment: thisComment
                });
              }
            }
          }
          this.violations = violationArray;
        });
      }
    );
  }

  wasClicked(): boolean {
    return this.disabled;
  }

  updateCheckedPass(checked : boolean) {
    this.passChecked = true;
    if(this.failChecked === true) {
      this.failChecked = false;
    }
    this.disabled = false;
  }

  updateCheckedFail(checked : boolean) {
    this.failChecked = true;
    if(this.passChecked === true){
      this.passChecked = false;
    }
    this.disabled = false;
  }

  submit(){
    if(this.passChecked){
      this.pass();
    } else if (this.failChecked){
      this.fail();
    }
    this.screeningService.finalSoftSkillComment = this.softSkillFeedback;
  }
 
  
  getViolations(): Observable<SoftSkillViolation[]> {
    return this.violationService.getPreviousViolations(+localStorage.getItem("screeningID"));
  }

  pass() {
    this.passed = true;
    this.endScreening = true;
    this.screeningService.softSkillsResult = "Pass";
  }

  fail() {
    this.passed = false;
    this.endScreening = true;
    this.screeningService.softSkillsResult = "Fail";
  }

  deleteViolation(violationIndex: number) {
    /*
    this.violationService.deleteViolation(this.violations[violationIndex].violationID).subscribe(
      data => {
        // After subscribed observable returns update array
        if (this.violations.length > 1) {
          this.violations.splice(violationIndex, 1);
        } else {
          this.violations = [];
        }
      }
    );
    */
    if (this.softSkillViolationService.softSkillViolations.length > 1) {
      this.softSkillViolationService.softSkillViolations.splice(violationIndex, 1);
    } else {
      this.softSkillViolationService.softSkillViolations = [];
    }
  }

  getMessage($event) {
    this.previousViolations = this.getViolations();
  }

  hasViolations(): boolean {
    if(this.softSkillViolationService.softSkillViolations == undefined || this.softSkillViolationService.softSkillViolations.length < 1){
      return false;
    }
    else{
      return true;
    }
  }

  public getPassed(): string{
    if(this.passed){
      return "passed";
    }
    else {
      return "failed";
    }
  }

  endScreeningPrompt() {
    if (this.endScreening) {
      return "block";
    } else {
      return "none";
    }
  }

  


}
