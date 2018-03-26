import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})
export class FinalReportComponent implements OnInit {
softSkillString: String;
bucketStringArray: String[];
overallScoreString: String;
generalNotesString: String;



  constructor() { }

  ngOnInit() {
    this.softSkillString = "Soft Skills: Pass";
    this.bucketStringArray = ["20/30 OOP", "24/30 Basics", "12/20 Advanced", "09/10 SQL", "06/10 Web"];
    this.overallScoreString = "Overall: 71%";
    this.generalNotesString = "Answers were clear and concise. Wonderful attitude.";
   
  }

}
