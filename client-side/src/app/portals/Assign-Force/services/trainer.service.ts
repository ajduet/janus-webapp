import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Trainer } from '../domain/trainer';
import { CalendarDialogComponent } from '../pto/pto.component';
import { MatDialog } from '@angular/material';
import { UrlService } from './url.service';

@Injectable()
export class TrainerService {

  url = this.urlService.getUrl() + '/api/trainer/api/v2/trainer';

  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private urlService: UrlService) {
  }

  /** Gets all Trainers in the database */
  getAll(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.url);
  }

  /** Gets a Trainer by ID */
  getById(id): Observable<Trainer> {
    return this.http.get<Trainer>(this.url + '/' + id);
  }

  /** Gets a Trainer by first and last name */
  getByFirstNameAndLastName(fName, lName): Observable<Trainer> {
    return this.http.get<Trainer>(this.url + '/' + fName + '/' + lName);
  }

  /** Adds a new Trainer to the database */
  create(trainer): Observable<any> {
    return this.http.post<any>(this.url, trainer);
  }

  /** Updates information about a given Trainer */
  update(trainer): Observable<any> {
    return this.http.put<any>(this.url, trainer);
  }

  /** Deletes a specified Trainer by ID */
  delete(id): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  /** Authorize calendar client */
  authorize() {
    this.showCalendar(); // For testing to make sure the Dialog is actually showing
    // gapi.load('client:auth2', this.showCalendar());
  }

  /** Shows the calendar Dialog */
  showCalendar() {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      // width: '450px',
    });
  }
}
