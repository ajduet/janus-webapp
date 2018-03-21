import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Pipes
import { SearchPipe } from '../../util/search.pipe';

// Classes
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { Track } from '../../entities/track';

// Mock Data
import { CANDIDATES } from '../../mock-data/mock-candidates';
import { TRACKS } from '../../mock-data/mock-tracks';

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
  tracks: Track[] = TRACKS;

  candidatesLength: number;

  // Filtering data by dates
  date = new Date();
  today = this.date.getTime();
  tomorrow = this.date.setDate(this.date.getDate() + 1);
  dayAfterTomorrow = this.date.setDate(this.date.getDate() + 3);

  beginScreening = false;

  /* ###########################
       CONSTRUCTOR and INIT
  ########################### */
  constructor(private http: HttpClientModule) {
    this.candidates = CANDIDATES;
    this.candidatesLength = this.candidates.length;
    this.tracks = TRACKS;
    
  }

  ngOnInit() {
    this.sortByDate();
  }

  /* ###########################
        FUNCTIONS
  ########################### */
  public sortByDate(): void {
    this.candidates.sort((trainee1: SimpleTrainee, trainee2: SimpleTrainee) => {
      return trainee1.schedule.getTime() - trainee2.schedule.getTime();
    });
}

  // [style.background-color]="beginScreeningPrompt()"
  beginScreeningPrompt() {
    if (this.beginScreening) {
      return "block";
    } else {
      return "none";
    }
  }
}
