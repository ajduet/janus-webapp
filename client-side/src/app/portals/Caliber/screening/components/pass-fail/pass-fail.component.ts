import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { Observable } from 'rxjs/Observable';


import { HttpParams } from '@angular/common/http';
import { ScreeningService } from '../../services/screening/screening.service';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})
export class PassFailComponent implements OnInit {

  //Candidate Name
  public candidateName: string;

  private passed: boolean;
  violations: SoftSkillViolation[];
  endScreening = false;
  public disabled = true;
  public passChecked: boolean;
  public failChecked: boolean;
  public hasChecked: boolean;
  private screeningID: number;

  // need a SoftSkillViolationService to get the data
  constructor(private violationService: SoftSkillsViolationService,
              private screeningService: ScreeningService,
              private simpleTraineeService: SimpleTraineeService,
  ) {}

  ngOnInit() {
    this.disabled = true;
    this.passChecked = false;
    this.failChecked = false;
    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    this.screeningID = 1;
    this.getViolations();
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
    console.log(this.passChecked);
    if(this.passChecked){
      this.pass();
    } else if (this.failChecked){
      this.fail();
    }
  }

  getViolations(): void {
    this.violationService.getPreviousViolations(this.screeningID).subscribe(
      data => {
        this.violations = data;
      }
    );
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
    if (this.violations.length > 1) {
      this.violations.splice(violationIndex, 1);
    } else {
      this.violations = [];
    }
  }

  hasViolations(): boolean {
    if(this.violations == undefined || this.violations.length < 1){
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
