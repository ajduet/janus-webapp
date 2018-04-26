import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Room } from '../../../model/Room';

@Injectable()
export class RoomControllerService {
  constructor(private http: HttpClient) {}

  private roomController = environment.apiUrls.roomController;

  public create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomController.baseUrl + this.roomController.create, room);
  }
  public update(room: Room): Observable<Room> {
    return this.http.put<Room>(this.roomController.baseUrl + this.roomController.update + room.id, room);
  }
  public findAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomController.baseUrl + this.roomController.findAll);
  }
  public remove(id: number): Observable<Room> {
    return this.http.delete<Room>(this.roomController.baseUrl + this.roomController.remove + id);
  }

  public find(id: number): Observable<Room> {
    return this.http.get<Room>(this.roomController.baseUrl + this.roomController.find + id);
  }
}
