import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { AlertsService } from './alerts.service';
import { environment } from '../../../../environments/environment';

// entities
import { Skill } from '../entities/Category';
import { CRUD } from '../interfaces/api.interface';
import { urls } from './urls';

/**
* this service manages calls to the web services
* for Category objects
*/
@Injectable()
export class SkillsService implements CRUD<Skill> {

  public listSubject = new BehaviorSubject<Skill[]>([]);

  constructor(public httpClient: HttpClient, public alertService: AlertsService) {
    this.listSubject = new BehaviorSubject([]);
  }

 /*
   =====================
   BEGIN: API calls
   =====================
 */

/**
 * retrieves all categories
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 */
 public fetchAll(): Observable<Skill[]> {
   this.httpClient.get<Skill[]>(urls.skills.fetchAll()).subscribe(res => this.listSubject.next(res));
   return this.listSubject.asObservable();
 }

 /**
 * retrieves all ACTIVE categories
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 */
 public fetchAllActive(): Observable<Skill[]> {
   const url = urls.skills.fetchAllActive();
   this.httpClient.get<Skill[]>(url)
   .subscribe((results) => this.listSubject.next(results));
   return this.listSubject.asObservable();
 }

 /**
 * retrieves a category by its ID
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 * @param id: number
 *
 * @return Observable<Category>
 */
 public fetchById(id: number): Observable<Skill> {
   const url = urls.skills.fetchById(id);
   return this.httpClient.get<Skill>(url);
 }

  /**
  * transmits a new Category to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param category: Category
  */
  public create(category: Skill): Observable<Skill> {
    const url = urls.skills.save();
    return this.httpClient.post<Skill>(url, JSON.stringify(category));
  }

  /**
   * transmits a Category to be updated.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param category: Category
   */
  public update(category: Skill): Observable<Skill> {
    const url = urls.skills.update();
    return this.httpClient.put<Skill>(url, JSON.stringify(category));
  }

  public delete(category: Skill): Observable<Skill> {
    return Observable.of(category);
  }
}
