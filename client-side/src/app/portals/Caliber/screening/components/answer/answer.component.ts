import { Component, OnInit, Input} from '@angular/core';
import { QuestionScore } from '../../entities/questionScore';
import { Question } from '../../entities/question';
import { QuestionService } from '../../services/question.service';

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
  
  // used to exchange data between the answer modal and question table component
  answeredQuestions: Question[];

  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService) { }

  ngOnInit() {
    this.questionScore = {
      qSID: null,
      questionID: this.question.questionID,  
      screeningID: null,
      score: 0,
      commentary: '',
      beginTime: new Date()
    }
    // update answeredQuestions array to match our question service's answeredQuestions array.
    this.questionService.currentAnsweredQuestions.subscribe(questions => this.answeredQuestions = questions)
  }
  // when a score is set and submitted, update the array of answered questions
  saveQuestion(): void{
      this.answeredQuestions.push(this.questionService.getSelectedQuestion());
      this.questionService.updateAnsweredQuestions(Array.from(new Set(this.answeredQuestions)));
  }
}
