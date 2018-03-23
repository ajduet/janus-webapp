import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { Observable } from 'rxjs/Observable';

// mock data for violations
import { MOCK_VIOLATIONS } from '../../mock-data/mock-violations';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})
export class PassFailComponent implements OnInit {

  private passed: boolean;
  violations: Observable<SoftSkillViolation[]>;
  mockViolations: SoftSkillViolation[] = [];
  endScreening = false;
  violationService: SoftSkillsViolationService;
  public disabled = true;
  public checked;

  // need a SoftSkillViolationService to get the data
  constructor(violationService: SoftSkillsViolationService) {
    this.mockViolations = MOCK_VIOLATIONS;
    //this.violations = this.getViolations();
    this.violationService = violationService;
   }

  ngOnInit() {
    this.disabled = true;
    this.checked = false;
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
  /*
  getViolations(): Observable<SoftSkillViolation[]>{
    return this.violationService.getPreviousViolations();
  }
  */

  pass() {
    this.passed = true;
    this.endScreening = true;
  }

  fail() {
    this.passed = false;
    this.endScreening = true;
  }

  deleteViolation(violation: SoftSkillViolation) {
    let param = new HttpParams().set('violationID', violation.violationID.toString());
  }

  hasViolations(): boolean {
    if(this.violations == undefined){
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
