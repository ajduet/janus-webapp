import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Pipes
import { SearchPipe } from "../../util/search.pipe";

// Classes
import { SimpleTrainee } from "../../entities/simpleTrainee";
import { SkillType } from "../../entities/skillType";
import { ScheduledScreening } from "../../entities/scheduleScreening";

// Services
import { SimpleTraineeService } from "../../services/simpleTrainee/simple-trainee.service";
import { SkillTypeService } from "../../services/skillType/skill-type.service";
import { ScreeningService } from "../../services/screening/screening.service";
import { ScheduleScreeningService } from "../../services/schedule-screening/schedule-screening.service";
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';

// Installed Modules
// npm install ngx-pagination --save
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module


@Component({
  selector: "app-candidates-screening-list",
  templateUrl: "./candidates-screening-list.component.html",
  styleUrls: ["./candidates-screening-list.component.css"]
})

/*
   This is the landing / homepage for our functionality. There are many candidates that must be screened, 
   and the screeners choose their candidates from a common pool. 
   A screener will choose a candidate from the list, and a modal will appear with the options to
   begin the interview or return to the list. Candidate list is paginated, with 10 results per page.
*/

export class CandidatesScreeningListComponent implements OnInit {
  /* ###########################
        FIELDS
  ########################### */
  //  Dummy data for testing search bar
  scheduledScreenings: ScheduledScreening[];
  candidates: SimpleTrainee[];
  skillTypes: SkillType[];
  selectedCandidate: SimpleTrainee;
  selectedScheduledScreening: ScheduledScreening;
  showBeginScreeningPrompt = false;
  searchText; // text in search bar
  p; // current page

  /* ###########################
       CONSTRUCTOR and INIT
  ########################### */
  constructor(
    private http: HttpClientModule,
    private simpleTraineeService: SimpleTraineeService,
    private skillTypeService: SkillTypeService,
    private screeningService: ScreeningService,
    private scheduleScreeningService: ScheduleScreeningService,
    private softSkillsViolationService: SoftSkillsViolationService,
    private questionScoreService: QuestionScoreService
  ) {
    
  }

  ngOnInit() {
    // if(this.softSkillsViolationService.softSkillViolations.length > 0 || this.questionScoreService.questionScores.length > 0) {
    //   window.location.reload(true);
    // }
      
    this.scheduleScreeningService.getScheduleScreenings().subscribe(data => {
      this.scheduledScreenings = data;
    });
    // this.simpleTraineeService.getSimpleTrainees().subscribe(data => {
    //   this.candidates = data;
    // });
    // this.skillTypeService.getSkillTypes().subscribe(data => {
    //   this.skillTypes = data;
    // });
  }

  /* ###########################
        FUNCTIONS
  ########################### */

  toggleBeginScreeningPrompt() {
    if (this.showBeginScreeningPrompt) {
      return "block";
    } else {
      return "none";
    }
  }

  confirmSelectedCandidate(): void {
    this.simpleTraineeService.setSelectedCandidate(this.selectedCandidate);
    localStorage.setItem("scheduledScreeningID", this.selectedScheduledScreening.scheduledScreeningId.toString());
  }
  
  beginScreening(): void {
    // create a new screening entry in the database
    this.screeningService.beginScreening(
        this.selectedScheduledScreening,
        new Date(), this.selectedScheduledScreening.trainer,
        this.selectedCandidate.skillTypeID,
      ).subscribe(data => {
        // retrieve the screening ID from the screening service
        // and save the screening ID as a cookie to localStorage.
        localStorage.setItem("screeningID", data.toString());
        console.log(localStorage.getItem("screeningID"));
      }
    );
    // localStorage.setItem("screeningID", this.screeningService.getScreeningID.toString());
  }
}
