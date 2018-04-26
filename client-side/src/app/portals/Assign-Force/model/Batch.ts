import { Curriculum } from './Curriculum';
import { Trainer } from './Trainer';
import { Skill } from './Skill';
import { Address } from './Address';
import { Room } from './Room';
import { Building } from './Building';
import { Focus } from './Focus';

export class Batch {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  curriculum: Curriculum;
  focus: Focus;
  trainer: Trainer;
  cotrainer: Trainer;
  skills: Skill[];
  address: Address;
  building: Building;
  room: Room;

  constructor(
    id: number,
    name: string,
    startDate: number,
    endDate: number,
    curriculum: Curriculum,
    focus: Focus,
    trainer: Trainer,
    cotrainer: Trainer,
    skills: Skill[],
    batchStatus: string,
    address: Address,
    building: Building,
    room: Room
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.curriculum = curriculum;
    this.focus = focus;
    this.trainer = trainer;
    this.cotrainer = cotrainer;
    this.skills = skills;
    this.address = address;
    this.building = building;
    this.room = room;
  }
}
