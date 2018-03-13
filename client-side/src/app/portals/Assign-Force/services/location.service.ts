import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/* Models */
import { Locations } from '../domain/locations';

/* Services */
import { UrlService } from './url.service';

@Injectable()
export class LocationService {

  url = this.urlService.getUrl() + '/api/location/api/v2/location';

  constructor(private http: HttpClient,
    private urlService: UrlService) {
  }

  /*
  =====================
    BEGIN: API calls
  =====================
  */

  /**
   * Gets all locations in the database
   */
  getAll(): Observable<Locations[]> {
    return this.http.get<Locations[]>(this.url);
  }

  /**
   * Gets a location by ID
   */
  getById(id): Observable<Locations> {
    return this.http.get<Locations>(this.url + '/' + id);
  }

  /**
   * Adds a new Locations to the database
   */
  create(location: Locations): Observable<any> {
    return this.http.post<any>(this.url, location);
  }

  /**
   * Updates information about a given Locations
   */
  update(location: Locations): Observable<any> {
    return this.http.put<any>(this.url, location);
  }

  /**
   * Delete location from the database
   */
  delete(location: Locations): Observable<any> {
    return this.http.delete<any>(this.url + '/' + location.id);
  }
}
