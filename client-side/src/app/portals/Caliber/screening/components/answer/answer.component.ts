import { Component, OnInit, Input} from '@angular/core';

// Entities
import { QuestionScore } from '../../entities/questionScore';
import { Question } from '../../entities/question';

// Services
import { QuestionService } from '../../services/question/question.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';

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
  questionScores: QuestionScore[];

  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService,
    private questionScoreService: QuestionScoreService) { }

  ngOnInit() {
    this.questionScore = {
      qSID: null,
      questionID: this.question.questionId,  
      screeningID: null,
      score: 0,
      commentary: '',
      beginTime: new Date()
    }
    // update answeredQuestions array to match our question service's answeredQuestions array.
    this.questionScoreService.currentQuestionScores.subscribe(answeredQuestions => this.questionScores = answeredQuestions);
  }
  // when a score is set and submitted, update the array of questions scores
  saveQuestionScore(): void{
      //
      if(this.questionScores.length > 0 ) {
        for(let q of this.questionScores) {
          if(q.questionID == this.questionScore.questionID) {
            this.questionScores.splice(this.questionScores.indexOf(q), 1);
          }
        }
      }
      this.questionScores.push(this.questionScore);
      this.questionScoreService.updateQuestionScores(this.questionScores);
  }
}
