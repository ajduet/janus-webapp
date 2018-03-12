import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../domain/room';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';

@Injectable()
export class RoomService {

  url = this.urlService.getUrl() + '/api/location/api/v2/room';

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  /** Gets all Rooms from the room service */
  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}`);
  }

  /** Gets a Room by ID from the room service */
  getById(id): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`);
  }

  /** Adds a new Room to the database */
  create(room: Room): Observable<any> {
    return this.http.post<any>(`${this.url}`, room);
  }

  /** Updates information about a given Room */
  update(room: Room): Observable<any> {
    return this.http.put<any>(`${this.url}`, room);
  }

  /** Delete a room from the Room service */
  delete(room: Room): Observable<any> {
    return this.http.delete<any>(`${this.url}/${room.roomID}`);
  }
}
