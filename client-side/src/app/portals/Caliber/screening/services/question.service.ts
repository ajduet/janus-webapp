import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Question } from '../entities/question';
import { QUESTIONS } from '../mock-data/mock-questions';

@Injectable()
export class QuestionService {

  getQuestions(): Observable<Question[]> {
    return of(QUESTIONS);
  }

  // BEGIN: EXCHANGING DATA BETWEEN QUESTION TABLE AND ANSWER MODAL
  answeredQuestions: Question[] = [];
  // questionsQuestionsSource tracks the value of answeredQuestions
  // and allows values to be sent to answeredQuestions
  private questionsQuestionsSource = new BehaviorSubject<Question[]>(this.answeredQuestions);
  // used to retrieve populate answeredQuestions in the data table component
  // and answer modal component
  currentAnsweredQuestions = this.questionsQuestionsSource.asObservable();
  //update the array of answered questions
  updateAnsweredQuestions(answeredQuestions: Question[]){
    this.questionsQuestionsSource.next(answeredQuestions);
  }
  // the current selected question
  selectedQuestion: Question = null;
  // update the current selected question
  updateSelectedQuestion(question: Question) {
    this.selectedQuestion = question;
  }
  // returns the current selected question
  getSelectedQuestion(): Question {
    return this.selectedQuestion;
  }
  // END: EXCHANGING DATA BETWEEN QUESTION TABLE AND ANSWER MODAL
  constructor() { }

}
