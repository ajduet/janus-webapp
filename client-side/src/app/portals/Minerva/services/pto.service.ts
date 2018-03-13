import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { showWarningOnce } from 'tslint/lib/error';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { CalendarDialogComponent } from '../pto/pto.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable()
export class PtoService {

  constructor(private http: HttpClient,
    private router: Router,
    private url: UrlService) {
  }

  /** Get Google Calendar implementation URL */
  getGoogle() {
    this.router.navigate(['api/v2/google/google']);
  }

  /** format a date for use with Google Calendar */
  formatDate(date: Date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1), day = '' + (d.getDate());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  /** Create a  thingy... */
  addPto(trainer, startDate, endDate) {

    startDate = this.formatDate(startDate);
    endDate = this.formatDate(endDate);

    const resource = {
      'start': {
        'date': startDate.toString()
      },
      'end': {
        'date': endDate.toString()
      },
    };

    const headers = new HttpHeaders({ 'contentType': 'application/json', 'data': JSON.stringify(resource) });
    const options = { headers: headers };
    this.http.post(this.url.getUrl() + '/api/uavailable' + '/api/v2/google/addEvent', {}, options)
      .subscribe(data => {
        console.log('Success');
      },
        error => {
          console.error('not logged in');
          // window.location.href = 'https://unavailable-service.cfapps.io/api/v2/google/google';
        });
  }
}
