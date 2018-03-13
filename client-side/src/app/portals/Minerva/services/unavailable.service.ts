import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UnavailableRoom, UnavailableTrainer } from '../domain/unavailable';
import { Room } from '../domain/room';
import { Trainer } from '../domain/trainer';
import { UrlService } from './url.service';

@Injectable()
export class UnavailableService {

  url = this.urlService.getUrl() + '/api/unavailable/api/v2/unavailable/';

  constructor(private http: HttpClient,
    private urlService: UrlService) { }

  /** Create an Unavailable room in the database */
  createUnavailableRoom(room: Room): Observable<UnavailableRoom> {
    return this.http.post<UnavailableRoom>(this.url, room);
  }

  /** Create an Unavailable Trainer in the database */
  createUnavailableTrainer(trainer: Trainer): Observable<UnavailableTrainer> {
    return this.http.post<UnavailableTrainer>(this.url, trainer);
  }

  /** Get an Unavailable Trainer from the database by ID */
  getUnavailableTrainer(id): Observable<UnavailableTrainer[]> {
    return this.http.get<UnavailableTrainer[]>(this.url + '/' + id);
  }

  /** Get Unavailable Room from the database by ID */
  getUnavailableRoom(id): Observable<UnavailableRoom> {
    return this.http.get<UnavailableRoom>(this.url + '/' + id);
  }

  /** Update an Unavailable Trainer */
  updateUnavailableTrainer(trainer: Trainer): Observable<UnavailableTrainer> {
    return this.http.put<UnavailableTrainer>(this.url, trainer);
  }

  /** Update an Unavailable Room */
  updateUnavailableRoom(room: Room): Observable<UnavailableRoom> {
    return this.http.put<UnavailableRoom>(this.url, room);
  }
}
