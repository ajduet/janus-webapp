import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
// services
import { AlertsService } from './alerts.service';
// import { environment } from '../../../environments/environment';
// entities
import { Assessment } from '../entities/Assessment';
import { CRUD } from '../interfaces/api.interface';
import { urls } from './urls';
/**
 * this service manages calls to the web service
 * for Assessment objects
 */
@Injectable()
export class AssessmentService implements CRUD<Assessment> {
  public listSubject: BehaviorSubject<Assessment[]>;
  public savedSubject: Subject<Assessment>;
  public updatedSubject: Subject<Assessment>;
  public deletedSubject: Subject<Assessment>;
  constructor(public http: HttpClient, public alertService: AlertsService) {
    // super(httpClient, alertService);
    this.listSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.updatedSubject = new Subject();
    this.deletedSubject = new Subject();
  }
  public getList(): Observable<Assessment[]> {
    return this.listSubject.asObservable();
  }
  public getSaved(): Observable<Assessment> {
    return this.savedSubject.asObservable();
  }
  /*
   =====================
   BEGIN: API calls
   =====================
 */
  /**
     * retrieves all assessments by batch ID by week number and pushes them
     * on the list subject
     *
     * @param batchId: number
     * @param week: number
     */
  public fetchByBatchIdByWeek(batchId: number, week: number): Observable<Assessment[]> {
    this.listSubject.next([]);
    this.http.get<any[]>(urls.assessment.fetchByBatchIdByWeek(batchId, week))
      .subscribe((results) => this.listSubject.next(results));
    return this.fetchAll();
  }
  public fetchAll(): Observable<Assessment[]> {
    return this.listSubject.asObservable();
  }
  /**
   * @overload
   *
   * @see save()
   *
   * creates an assessment and pushes the created assessement on
   * the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER')")
   *
   * @param assessment: Assessment
   */
  public create(assessment: Assessment): Observable<Assessment> {
    this.save(assessment);
    return this.savedSubject.asObservable();
  }
  /**
  * creates an assessment and pushes the created assessement on
  * the savedSubject
  *
  * NOTE: the createAssessment on the AssessmentController does NOT
  * return the created assessment object with the generated ID so
  * this is going to fake it and not make a lot of sense as a result
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER')")
  *
  * @param assessment: Assessment
  */
  public save(assessment: Assessment): void {
    const url = urls.assessment.save();
    const fetchUrl = urls.assessment.fetchByBatchIdByWeek(assessment.batch.batchId, assessment.week);
    const body = JSON.stringify(assessment);
    this.http.post(url, body, { responseType: 'text' }).subscribe(() => {
      this.http.get<any[]>(fetchUrl).subscribe((list) => {
        const matches = list.filter((value) => {
          switch (true) {
            case (value.rawScore !== assessment.rawScore):
            case (value.type !== assessment.type):
            case (value.category.skillId !== assessment.category.skillId):
              return false;
            default:
              return true;
          }
        });
        /*
        * reverse sort with the highest id value on top
        */
        matches.sort((a, b) => {
          switch (true) {
            case (a.assessmentId > b.assessmentId):
              return -1;
            case (a.assessmentId < b.assessmentId):
              return 1;
            default:
              return 0;
          }
        });
        this.savedSubject.next(matches[0]);
        this.listSubject.next(list);
      });
    });
  }
  /**
   * updates an assessment and pushes the updated assessment on the
   * savedSubject
   *
   * spring-security: <null>
   *
   * @param assessment: Assessment
   */
  public update(assessment: Assessment): Observable<Assessment> {
    this.http.put<Assessment>(urls.assessment.update(), JSON.stringify(assessment)).subscribe((data) => {
      this.updatedSubject.next(data);
    });
    return this.updatedSubject.asObservable();
  }
  /**
   * deletes an assessment and pushes the deleted assessment on the
   * deletedSubject
   *
   * spring-security: <null>
   *
   * @param assessment: Assessment
   */
  public delete(assessment: Assessment): Observable<any> {
    const result = this.http.delete(urls.assessment.delete(assessment.assessmentId)).subscribe( res => {
      this.deletedSubject.next(assessment);
    });
    return this.deletedSubject.asObservable();
  }
}
