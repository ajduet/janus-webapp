import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { TRAINEES } from '../../mock-data/mock-simpleTrainees';

@Injectable()
export class SimpleTraineeService {

  constructor(private httpClient: HttpClient) { }

  // Need to change to match the backend
  // private ROOT_URL: string = 'http://localhost:8080/screening';

  selectedCandidate: SimpleTrainee;

  setSelectedCandidate(candidate: SimpleTrainee): void {
    this.selectedCandidate = candidate;
  }

  getSelectedCandidate(): SimpleTrainee{
    return this.selectedCandidate;
  }
  getSimpleTrainees(): Observable<SimpleTrainee[]> {
    return of(TRAINEES);
  }

  // Eric
  // getSimpleTrainees(): Observable<SimpleTrainee[]> {
  //   return this.httpClient.get<SimpleTrainee[]>(this.ROOT_URL + '/all/trainee/all.json');
  // }
}
