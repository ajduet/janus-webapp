import { Skill } from './Skill';
import { Unavailability } from './Unavailability';
import { Address } from './Address';

export class Trainer {
  id: number;
  firstName: string;
  lastName: string;
  skills: Skill[];
  certifications: any;
  active: boolean;
  resume: any;
  preferredLocation: Address;
  unavailabilities: Unavailability[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    skills: Skill[],
    certifications: any,
    active: boolean,
    resume: any,
    unavailabilities: Unavailability[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.skills = skills;
    this.certifications = certifications;
    this.active = active;
    this.resume = resume;
    this.unavailabilities = unavailabilities;
  }
}
