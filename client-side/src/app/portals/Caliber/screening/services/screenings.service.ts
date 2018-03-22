import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Screening } from '../entities/screening';

@Injectable()
export class ScreeningsService {

  constructor(private http : HttpClient) { }

  public screeningID$ : Observable<Screening>;

  retrieveScreening(): Observable<Screening>{
    this.screeningID$ = this.http.post<Screening>('', {})
    return this.screeningID$;
  }
}
