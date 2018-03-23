import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { Observable } from 'rxjs/Observable';


import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})
export class PassFailComponent implements OnInit {

  private passed: boolean;
  violations: SoftSkillViolation[];
  endScreening = false;
  public disabled = true;
  public checked;
  private screeningID: number;

  // need a SoftSkillViolationService to get the data
  constructor(private violationService: SoftSkillsViolationService) {}

  ngOnInit() {
    this.disabled = true;
    this.checked = false;
    this.screeningID = 1;
    this.getViolations();
  }

  wasClicked(): boolean {
    return this.disabled;
  }

  updateChecked(checked : boolean) {
    this.checked = checked;
    this.disabled = false;
  }

  submit(){
    if(this.checked){
      this.pass();
    } else {
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
  }

  fail() {
    this.passed = false;
    this.endScreening = true;
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
