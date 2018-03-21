import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType.service';
import { SoftSkillViolation } from '../../entities/softSkillViolation';

@Component({
  selector: 'app-pass-fail',
  templateUrl: './pass-fail.component.html',
  styleUrls: ['./pass-fail.component.css']
})
export class PassFailComponent implements OnInit {

  passOrFail: string;
  violations: SoftSkillViolation[] = [];
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

  viewSummary() {
    
  }

  


}
