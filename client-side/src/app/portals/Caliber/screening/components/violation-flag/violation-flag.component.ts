import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { AlertsService } from '../../../services/alerts.service'
import { SoftSkillViolation } from '../../entities/softSkillViolation';
import { ScreeningService } from '../../services/screening/screening.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-violation-flag',
  templateUrl: './violation-flag.component.html',
  styleUrls: ['./violation-flag.component.css']
})

/*
For a given set of "soft skill" violations 
(using profanity, not professionally dressed, rudeness, etc), 
the screener is able to add a "flag" for a soft skill violation. 
Upon a given incident the screener can select the type(s) of violation 
that occurred and add a message giving specific explanation.

This component is included in several others, 
to ensure quick access during the entire interview.
*/

export class ViolationFlagComponent implements OnInit {

  violationTypes: ViolationType[];
  violationTypesChecked: ViolationType[] = [];
  public candidateName: string;
  public addViolation: boolean = false;
  public violationComment: string;

  constructor(
    private violationService: SoftSkillsViolationService,
    private simpleTraineeService: SimpleTraineeService,
    private violationTypeService: ViolationTypeService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() {
    this.getViolationTypes();
    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
  }

  getViolationTypes(): void {
    this.violationTypeService.getViolationTypes().subscribe(
      violationTypes => {
        this.violationTypes = violationTypes;
      }
    );
  }

  updateViolationList(changedViolationType : ViolationType, checked : boolean) {
    if(checked) {
      this.violationTypesChecked.push(changedViolationType);
    } else {
      let index = this.violationTypesChecked.findIndex(x => x == changedViolationType);
      this.violationTypesChecked.splice(index);
    }
    console.log(changedViolationType.violationType);
  }

  submitViolation(violationType: ViolationType, comment: string): Observable<SoftSkillViolation[]> {
    //Send request with the violation + comments to database
    let screeningID = localStorage.getItem("screeningID");
    this.alertsService.success('Soft Skill Violation Added');
    return this.violationService.submitViolation(violationType.violationID, comment, screeningID);
  }

  cancelViolation() {
    
  }

}
