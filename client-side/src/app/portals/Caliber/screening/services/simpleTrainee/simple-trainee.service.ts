import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { TRAINEES } from '../../mock-data/mock-simpleTrainees';

@Injectable()
export class SimpleTraineeService {

  constructor() { }

  getSimpleTrainees(): Observable<SimpleTrainee[]> {
    return of(TRAINEES);
  }
}
