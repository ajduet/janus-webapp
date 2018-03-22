import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SkillType } from '../../entities/skillType';
import { SKILLTYPES } from '../../mock-data/mock-skillTypes';

@Injectable()
export class SkillTypeService {

  constructor() { }
  getSkillTypes(): Observable<SkillType[]> {
    return of(SKILLTYPES);
  }
}
