import { Skill } from './Skill';
import { Focus } from './Focus';

export class Curriculum {
  id: number;
  name: string;
  active: boolean;
  focuses: Focus[];
  skills: Skill[];

  constructor(id: number, name: string, active: boolean, focuses: Focus[], skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.focuses = focuses;
    this.skills = skills;
  }
}
