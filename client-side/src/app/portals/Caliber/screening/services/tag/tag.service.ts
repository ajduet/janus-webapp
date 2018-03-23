import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Tag } from '../../entities/tag';
import { TAGS } from '../../mock-data/mock-tags';

@Injectable()
export class TagService {

  constructor(private http: HttpClient) { }

  public tagListChecked: Tag[];

  /*
  // Real endpoint for future use
  getAllTags(): Observable<Tag[]>{
    return this.http.post<Tag[]>('<endpoint>/tag/all', {});
  }
  
  */
  // Fake local data for temp use
  getAllTags(): Observable<Tag[]>{
    return of(TAGS);
  }

  getCheckedTags(): Tag[] {
    return this.tagListChecked; 
  }
}