import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionScore } from '../../entities/questionScore';
import { HttpClientModule } from '@angular/common/http';

/*
Exchanges data between QuestionBank (the table) and Question (the modal) components.
*/
@Injectable()
export class QuestionScoreService {

  constructor(private htttpClient: HttpClientModule) { }

  // BEGIN: EXCHANGING DATA BETWEEN QUESTION TABLE AND ANSWER MODAL
  questionScores: QuestionScore[] = [];

  // questionsQuestionsSource tracks the value of answeredQuestions
  // and allows values to be sent to answeredQuestions
  private questionScoresSource = new BehaviorSubject<QuestionScore[]>(this.questionScores);

  // used to retrieve populate answeredQuestions in the data table component
  // and answer modal component

  currentQuestionScores = this.questionScoresSource.asObservable();
  //update the array of answered questions

  updateQuestionScores(questionScores: QuestionScore[]){
    this.questionScoresSource.next(questionScores);
  }

  /* Uses currentQuestionScores Observable instead
  getQuestions(): QuestionScore[] {
    return this.questionScores;
  }
  */
}
