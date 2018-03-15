import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../entities/Category';

@Pipe({
  name: 'categorySkill'
})
export class CategorySkillPipe implements PipeTransform {

  transform(value: Skill): string {
    return value.skillName;
  }

}
