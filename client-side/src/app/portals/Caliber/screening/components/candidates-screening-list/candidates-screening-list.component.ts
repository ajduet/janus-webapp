import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { SearchPipe } from '../../util/search.pipe';
// npm install ngx-pagination --save
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { NAMES } from '../../mock-data/mock-candidates';
@Component({
  selector: 'app-candidates-screening-list',
  templateUrl: './candidates-screening-list.component.html',
  styleUrls: ['./candidates-screening-list.component.css']
})
export class CandidatesScreeningListComponent implements OnInit {

  //  Dummy data for testing search bar
  candidates: any[] = NAMES;
  candidatesLength: number;
  date = new Date();
  today = this.date.getTime();
  tomorrow = this.date.setDate(this.date.getDate() + 1);
  dayAfterTomorrow = this.date.setDate(this.date.getDate() + 3);
  tracks = [
    'Java',
    'C++',
    'Selenium',
    'Business Analyst',
    '.NET',
    'Other',
  ];

  beginScreening = false;
  constructor(private http: HttpClientModule) {
    this.candidatesLength = this.candidates.length;
  }

  ngOnInit() {
  }
  // [style.background-color]="beginScreeningPrompt()"
  beginScreeningPrompt() {
    if (this.beginScreening) {
      return "block";
    } else {
      return "none";
    }
  }

  getTodaysDate() {
      this.today = new Date().getTime();
      console.log(this.today);
  }

  getTomorrow(){
    let date = new Date();
    this.tomorrow = this.date.setDate(this.date.getDate() + 1);
      console.log(this.tomorrow);
  }

  getNext3Days(){
    let date = new Date();
    this.dayAfterTomorrow = this.date.setDate(this.date.getDate() + 2);
    console.log(this.dayAfterTomorrow);
  }
}
