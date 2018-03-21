import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SimpleTrainee } from '../entities/simpleTrainee';
import { CANDIDATES } from '../mock-data/mock-candidates';

@Injectable()
export class SimpleTraineeService {

  constructor() { }

  getSimpleTrainees(): Observable<SimpleTrainee[]> {
    return of(CANDIDATES);
  }
}
