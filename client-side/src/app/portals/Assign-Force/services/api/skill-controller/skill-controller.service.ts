import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../../../model/Skill';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class SkillControllerService {
  constructor(private http: HttpClient) {}

  private skillController = environment.apiUrls.skillController;

  public create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillController.baseUrl + this.skillController.create, skill);
  }
  public update(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.skillController.baseUrl + this.skillController.update + skill.id, skill);
  }
  public findAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillController.baseUrl + this.skillController.findAll);
  }
  public remove(id: number): Observable<Skill> {
    return this.http.delete<Skill>(this.skillController.baseUrl + this.skillController.remove + id);
  }

  public find(id: number): Observable<Skill> {
    return this.http.get<Skill>(this.skillController.baseUrl + this.skillController.find + id);
  }
}
