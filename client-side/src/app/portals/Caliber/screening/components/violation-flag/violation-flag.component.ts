import { Component, OnInit } from '@angular/core';
import { ViolationType } from '../../entities/violationType';
import { ViolationTypeService } from '../../services/violationType/violationType.service';

@Component({
  selector: 'app-violation-flag',
  templateUrl: './violation-flag.component.html',
  styleUrls: ['./violation-flag.component.css']
})
export class ViolationFlagComponent implements OnInit {

  violationTypes: ViolationType[];
  violationTypesChecked: ViolationType[] = [];

  constructor(private violationTypeService: ViolationTypeService) { }

  ngOnInit() {
    this.getViolationTypes();
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

}
