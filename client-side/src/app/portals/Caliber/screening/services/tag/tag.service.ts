import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from '../../entities/tag';

@Injectable()
export class TagService {

  constructor(private http: HttpClient) { }

  public tagList: Tag[];
  public tagListChecked: Tag[];
  public sampleTags: Tag[];

  tagList$: Observable<Tag[]>;

  getAllTags(){
    this.tagList$ = this.http.post<Tag[]>('<endpoint>/tag/all', {});
    return this.tagList$;
  }
  
  getAllTestTags(): Tag[]{
    this.sampleTags = [];
    this.sampleTags[0] = { tagID : 0, tagName : "Polymorphism"};
    this.sampleTags[1] = { tagID : 1, tagName : "Inheritance"};
    this.sampleTags[2] = { tagID : 2, tagName : "Encapsulation"};
    this.sampleTags[3] = { tagID : 3, tagName : "Abstraction"};

    return this.sampleTags;
  }

  getCheckedTags(): Tag[] {
    return this.tagListChecked;
  }
}