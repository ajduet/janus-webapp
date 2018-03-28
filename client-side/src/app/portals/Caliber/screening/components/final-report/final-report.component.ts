import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../../services/screening/screening.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SkillTypeBucketService } from '../../services/skillTypeBucketLookup/skill-type-bucket.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service'
import { QuestionScore } from '../../entities/questionScore';
import { ScoresToBucketsUtil } from '../../util/scoresToBuckets.util'
import { AlertsService } from '../../../services/alerts.service'

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})

/*
A simple text summary of how the candidate performed 
in each category on technical skills,the overall feedback thereon, 
and if the candidate passed or failed their soft skills evaluation. 
Screener can copy the summary to the clipboard, and return to the candidate list. 
*/

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

questionScores: QuestionScore[];

public checked: string;


  constructor(
    private screeningService: ScreeningService,
    private simpleTraineeService: SimpleTraineeService,
    private skillTypeBucketService: SkillTypeBucketService,
    private questionScoreService: QuestionScoreService,
    private scoresToBucketsUtil: ScoresToBucketsUtil,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() {
    this.checked = 'false';
    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    this.softSkillString = "Soft Skills: " + this.screeningService.softSkillsResult;
    this.allTextString = this.softSkillString + "\n";
    this.questionScoreService.currentQuestionScores.subscribe(
      questionScores => {
        this.questionScores = questionScores;
        this.bucketStringArray = this.scoresToBucketsUtil.getFinalBreakdown(this.questionScores, this.skillTypeBucketService.bucketsByWeight);
        this.overallScoreString = this.bucketStringArray[this.bucketStringArray.length-1];
        this.bucketStringArray.splice(this.bucketStringArray.length-1, 1);
        this.bucketStringArray.forEach(bucketString => {
          this.allTextString += bucketString + "\n";
        });
        this.allTextString += this.overallScoreString + "\n";
      });
    //this.overallScoreString = "Overall: 71%";
    this.generalNotesString = this.screeningService.generalComments;
    this.allTextString += "\"" + this.generalNotesString + "\"";
    
  }

  //Used for copying the data to the clipboard (this is done using ngx-clipboard)
  copyToClipboard(){
    this.checked = 'true';
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
    this.alertsService.success('Copied to Clipboard');

  }

}