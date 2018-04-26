import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Unavailability } from '../../../model/Unavailability';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnavailableControllerService {
  constructor(private http: HttpClient) {}

  private unavailableController = environment.apiUrls.unavailableController;

  public create(unavailable: Unavailability): Observable<Unavailability> {
    return this.http.post<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.create,
      unavailable
    );
  }
  public update(unavailable: Unavailability): Observable<Unavailability> {
    return this.http.put<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.update + unavailable.id,
      unavailable
    );
  }
  public findAll(): Observable<Unavailability[]> {
    return this.http.get<Unavailability[]>(this.unavailableController.baseUrl + this.unavailableController.findAll);
  }
  public remove(id: number): Observable<Unavailability> {
    return this.http.delete<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.remove + id
    );
  }

  public find(id: number): Observable<Unavailability> {
    return this.http.get<Unavailability>(this.unavailableController.baseUrl + this.unavailableController.find + id);
  }
}
