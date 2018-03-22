import { Component, OnInit, Input } from '@angular/core';
import { QuestionScore } from '../../entities/questionScore';

// ngbootstrap for modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() question;

  questionScore: QuestionScore;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.questionScore = {
      qSID: null,
      questionID: this.question.questionID,  
      screeningID: null,
      score: 0,
      commentary: '',
      beginTime: new Date()
    }
    console.log(this.questionScore);
  }

}
