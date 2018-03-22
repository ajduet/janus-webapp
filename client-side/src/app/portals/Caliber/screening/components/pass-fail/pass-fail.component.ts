import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';

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
  violations: SoftSkillViolation[] = [];
  mockViolations: SoftSkillViolation[] = [];
  endScreening = false;

  // need a SoftSkillViolationService to get the data
  constructor(softSkillsViolationService: SoftSkillsViolationService) {
    this.mockViolations = MOCK_VIOLATIONS;
   }

  ngOnInit() {
  }

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
