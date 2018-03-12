import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { urls } from './urls';


// Interfaces
import { Fetch } from '../interfaces/api.interface';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * manages API calls for TrainingTypes
 */
@Injectable()
export class TrainingTypeService implements Fetch<String> {

  public listSubject = new BehaviorSubject<string[]>(new Array<string>());

  constructor(private httpClient: HttpClient) {
    this.fetchAll();
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
  * retrieves all skills and pushes them on the listSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'STAGING','TRAINER','QC','PANEL')")
  */
  public fetchAll(): Observable<string[]> {
    this.httpClient.get<string[]>(urls.trainingType.fetchAll()).subscribe(x => this.listSubject.next(x));
    return this.listSubject.asObservable();
  }

}
