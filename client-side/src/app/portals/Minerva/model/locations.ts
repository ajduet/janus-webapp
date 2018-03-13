import {Building} from './building';

export interface Locations {
  id: string;
  name: string;
  city: string;
  state: string;
  buildings: Building[];
}
