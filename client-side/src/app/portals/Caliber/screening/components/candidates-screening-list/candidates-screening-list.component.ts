import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Pipes
import { SearchPipe } from '../../util/search.pipe';

// Classes
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { SkillType } from '../../entities/skillType';

// Services
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';

// Installed Modules
// npm install ngx-pagination --save
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-candidates-screening-list',
  templateUrl: './candidates-screening-list.component.html',
  styleUrls: ['./candidates-screening-list.component.css']
})
export class CandidatesScreeningListComponent implements OnInit {

  /* ###########################
        FIELDS
  ########################### */
  //  Dummy data for testing search bar
  candidates: SimpleTrainee[];
  skillTypes: SkillType[];
  beginScreening = false;

  /* ###########################
       CONSTRUCTOR and INIT
  ########################### */
  constructor(private http: HttpClientModule, private simpleTraineeService: SimpleTraineeService,
    private skillTypeService: SkillTypeService) {
  }

  ngOnInit() {
    this.simpleTraineeService.getSimpleTrainees().subscribe(data => {
      this.candidates = data;
    });
    this.skillTypeService.getSkillTypes().subscribe(data => {
      this.skillTypes = data;
    });
  }

  /* ###########################
        FUNCTIONS
  ########################### */

  // [style.background-color]="beginScreeningPrompt()"
  beginScreeningPrompt() {
    if (this.beginScreening) {
      return "block";
    } else {
      return "none";
    }
  }
}
