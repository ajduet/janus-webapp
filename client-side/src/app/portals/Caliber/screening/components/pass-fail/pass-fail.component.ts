import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})
export class PassFailComponent implements OnInit {

  private passed: boolean;
  violations: SoftSkillViolation[] = [];
  endScreening = false;

  // need a SoftSkillViolationService to get the data
  constructor() {
    
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
