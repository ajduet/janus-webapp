import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/* Models */
import { Batch } from '../domain/batch';

/* Services */
import { UrlService } from './url.service';

/**
 * Batch service manages reading and saving batch data to the batch service
 */

@Injectable()
export class BatchService {

  url = this.urlService.getUrl() + '/api/batch/api/v2/batch';

  constructor(private http: HttpClient,
    private urlService: UrlService) { }

  /*
  =====================
    BEGIN: API calls
  =====================
  */

  /**
   * Returns all batches currently listed in the database via batch service
   */
  getAll(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url);
  }

  /**
   * Returns a single Batch by ID via batch service
   */
  getById(id): Observable<Batch> {
    return this.http.get<Batch>(this.url + '/' + id);
  }

  /**
   * Create batch and save to the database via batch service
   */
  create(batch): Observable<Batch> {
    return this.http.post<Batch>(this.url, batch);
  }

  /**
   * Deletes a batch from the database via batch service
   */
  delete(id): Observable<object> {
    return this.http.delete<Object>(this.url + '/' + id);
  }

  /**
   * Updates a batch to the database via batch service
   */
  update(batch): Observable<Batch> {
    return this.http.put<Batch>(this.url, batch);
  }
}
