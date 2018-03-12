import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Skill} from '../domain/skill';
import {UrlService} from './url.service';

@Injectable()
export class SkillService {

  // url = 'http://localhost:9090/api/v2/skill';
  url = this.urlService.getUrl() + '/api/skill/api/v2/skill';
  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  // var Skill = $resource('api/v2/skill/:skillId',{skillId:'@skillId'},{update:{method:'PUT', url:});

  /** This function does nothing and returns nothing */
  getEmptySkill() {
    // return new Skill();
  }

  /** Add a new skill to the database */
  create(skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.url}`, skill);
  }

  /** Get all skills from the database */
  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.url}`);
  }

  /** Get skills by ID number from the database */
  getSkillsByIds(ids): Observable<Skill[]> {
    return this.http.post<Skill[]>(`${this.url}/ids`, ids);
  }

  /** Get a single skill by it's ID number */
  getById(skillId): Observable<Skill> {
    return this.http.get<Skill>(`${this.url}/${skillId}`);
  }

  /** Update a skill in the database */
  update(skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.url}`, skill);
  }

  /** Delete a skill from the database */
  delete(skillId): Observable<any> {
    return this.http.delete<any>(`${this.url}/${skillId}`);
  }
}
