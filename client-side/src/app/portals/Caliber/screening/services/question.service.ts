import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Question } from '../entities/question';
import { QUESTIONS } from '../mock-data/mock-questions';

@Injectable()
export class QuestionService {

  getQuestions(): Observable<Question[]> {
    return of(QUESTIONS);
  }

  constructor() { }

}
