export class Unavailability {
  id: number;
  startDate: number;
  endDate: number;

  constructor(id: number, startDate: number, endDate: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
