import {Room} from './room';

export interface Building {
  id: number;
  name: string;
  location: number;
  active: boolean;
  rooms: Room[];
}
