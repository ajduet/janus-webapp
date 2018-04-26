export class Address {
  id: number;
  name: string;
  city: string;
  state: string;
  active: boolean;

  constructor(id: number, name: string, city: string, state: string) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.state = state;
  }
}
