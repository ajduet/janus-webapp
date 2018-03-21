import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Track } from '../entities/track';
import { TRACKS } from '../mock-data/mock-tracks';

@Injectable()
export class TrackService {

  constructor() { }

  getTracks(): Observable<Track[]> {
    return of(TRACKS);
  }
}
