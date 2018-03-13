import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/* Models */
import { Curriculum } from '../domain/curriculum';

/* Services */
import { UrlService } from './url.service';

/**
 * Curricula (Bad Name) Service provides access to the Hydra
 * curriculum service.
 */

@Injectable()
export class CurriculaService {

  url = this.urlService.getUrl() + '/api/curriculum/api/v2/curriculum';

  constructor(private http: HttpClient,
    private urlService: UrlService) { }

  /*
  =====================
    BEGIN: API calls
  =====================
  */

  /**
   * Get all curricula from the curriculum service
   */
  getAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.url);
  }

  /**
   * Get all active curriculum from the curriculum service
   */
  getAllActive(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.url + '/active');
  }

  /**
   * Get curriculum by ID from the curriculum service
   */
  getById(id): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.url + '/' + id);
  }

  /**
   * Create new curriculum in the curriculum service
   */
  create(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.url, curriculum);
  }

  /**
   * Update a curriculum in the curriculum service
   */
  update(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.put<Curriculum>(this.url, curriculum);
  }

  /**
   * Delete curriculum from the curriculum service
   */
  delete(currId): Observable<object> {
    return this.http.delete<Object>(this.url + '/' + currId);
  }
}
