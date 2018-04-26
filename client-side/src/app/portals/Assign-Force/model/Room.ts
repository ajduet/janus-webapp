import { Unavailability } from './Unavailability';
import { Building } from './Building';

export class Room {
  id: number;
  active: boolean;
  roomName: string;
  building: Building;
  unavailabilities: Unavailability[];

  constructor(id: number, active: boolean, roomName: string, building: Building, unavailabilities: Unavailability[]) {
    this.id = id;
    this.active = active;
    this.roomName = roomName;
    this.building = building;
    this.unavailabilities = unavailabilities;
  }
}
