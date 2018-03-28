import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionScore } from '../../entities/questionScore';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UrlUtilService } from '../UrlUtil/url-util.service';

/*
Exchanges data between QuestionBank (the table) and Question (the modal) components.
*/
@Injectable()
export class QuestionScoreService {

  constructor(private httpClient: HttpClient,
              private urlUtil: UrlUtilService) { }

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

  postQuestionScore(question: QuestionScore): any{ 
    let url = this.urlUtil.getBase()+'/question-score-service/question/score';

    // the actual parameter to add 
    //params.append("ScreeningID", question.screeningID.toString());

    if( this.httpClient.post<QuestionScore>(url, { 
      Score: question.score,
      Comment: question.commentary,
      QuestionID: question.questionId,
      BeginTime: question.beginTime, 
      ScreeningID: 280001 })){
        return "SUCCESS!";
    } else {
      return "ERROR";
    }

    /* 
      return this.httpClient.post<QuestionScore>(url, { 
      Score: question.score,
      Comment: question.commentary,
      QuestionID: question.questionId,
      BeginTime: question.beginTime, 
      ScreeningID: question.screeningID
      });
    */
  }

  /* Uses currentQuestionScores Observable instead
  getQuestions(): QuestionScore[] {
    return this.questionScores;
  }
  */
}
