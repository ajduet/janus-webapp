import { Skill } from './Skill';

export class Focus {
  id: number;
  name: string;
  active: boolean;
  skills: Skill[];

  constructor(id: number, name: string, active: boolean, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.skills = skills;
  }
}
