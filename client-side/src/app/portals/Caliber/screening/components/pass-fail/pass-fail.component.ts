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

  passOrFail: string;
  violations: SoftSkillViolation[] = [];
  beginScreening = false;
  // need a SoftSkillViolationService to get the data
  constructor() {
    
   }

  ngOnInit() {
  }

  pass() {
    this.passOrFail = "pass";
  }

  fail() {
    this.passOrFail = "fail";
  }

  beginScreeningPrompt() {
    if (this.beginScreening) {
      return "block";
    } else {
      return "none";
    }
  }

  


}
