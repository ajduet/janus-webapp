import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViolationType } from '../../entities/violationType';
import { VIOLATION_TYPES } from '../../mock-data/mock-violationTypes';
import { of } from 'rxjs/observable/of';


// Used to obtain an observable of mock Violation types
@Injectable()
export class ViolationTypeService {

  getViolationTypes(): Observable<ViolationType[]> {
    return of(VIOLATION_TYPES);
  }

  constructor() { }

}