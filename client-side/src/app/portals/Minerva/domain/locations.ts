import {Building} from './building';

export interface Locations {
  id: number;
  name: string;
  city: string;
  state: string;
  active: boolean;
  buildings: Building[];
}
