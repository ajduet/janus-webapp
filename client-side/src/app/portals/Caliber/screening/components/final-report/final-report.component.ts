import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})

export class FinalReportComponent implements OnInit {
//Strings of each part
softSkillString: string;
bucketStringArray: string[];
overallScoreString: string;
generalNotesString: string;
//Compounded Strings
allTextString: string;




  constructor() { }

  ngOnInit() {
    //Hardcoded Data
    this.softSkillString = "Soft Skills: Pass";
    this.bucketStringArray = ["\n" + "20/30 OOP","\n" +  "24/30 Basics","\n" +  "12/20 Advanced","\n" +  "09/10 SQL","\n" + "06/10 Web"];
    this.overallScoreString = "Overall: 71%";
    this.generalNotesString = "Answers were clear and concise. Wonderful attitude.";
    this.allTextString = this.softSkillString + "\n" + this.bucketStringArray + "\n" + this.overallScoreString + "\n" + this.generalNotesString;
    
  }

  //Used for copying the data to the clipboard (this is done using ngx-clipboard)
  copyToClipboard(){

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.allTextString;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }

}
