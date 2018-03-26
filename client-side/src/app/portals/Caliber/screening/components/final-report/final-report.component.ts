import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../../services/screening/screenings.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})

export class FinalReportComponent implements OnInit {
//Candidate's name
public candidateName: string;

//Individual strings
softSkillString: string;
bucketStringArray: string[];
overallScoreString: string;
generalNotesString: string;
//Compounded Strings
allTextString: string;


  constructor(private screeningService: ScreeningService,
    private simpleTraineeService: SimpleTraineeService) { }

  ngOnInit() {
    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    this.softSkillString = "Soft Skills: " + this.screeningService.softSkillsResult;
    this.bucketStringArray = ["20/30 OOP", "24/30 Basics", "12/20 Advanced", "09/10 SQL", "06/10 Web"];
    this.overallScoreString = "Overall: 71%";
    this.generalNotesString = this.screeningService.generalComments;
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
