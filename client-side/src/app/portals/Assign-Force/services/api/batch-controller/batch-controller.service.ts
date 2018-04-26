import { Injectable } from '@angular/core';
import { Batch } from '../../../model/Batch';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BatchControllerService {
  constructor(private http: HttpClient) {}

  private batchController = environment.apiUrls.batchController;

  public create(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.batchController.baseUrl + this.batchController.create, batch);
  }
  public update(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.batchController.baseUrl + this.batchController.update + batch.id, batch);
  }
  public findAll(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.batchController.baseUrl + this.batchController.findAll);
  }
  public remove(id: number): Observable<Batch> {
    return this.http.delete<Batch>(this.batchController.baseUrl + this.batchController.remove + id);
  }

  public find(id: number): Observable<Batch> {
    return this.http.get<Batch>(this.batchController.baseUrl + this.batchController.find + id);
  }
}
