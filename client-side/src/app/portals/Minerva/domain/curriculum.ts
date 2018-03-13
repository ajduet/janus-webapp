import {Skill} from './skill';

export interface Curriculum {
  currId: number;
  name: string;
  core: boolean;
  active: boolean;
  skills: any;
  skillObjects: any;
}
