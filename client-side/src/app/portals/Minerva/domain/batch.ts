// everything is a string right now for testin.
// we will change things accordingly when we make the other POJOS

export interface Batch {
  name: string;
  startDate: Date;
  endDate: Date;
  curriculum: number;
  focus: number;
  trainer: string;
  cotrainer: string;
  batchStatus: BatchStatus;
  batchLocation: BatchLocation;
  skills: number[];
  id: number;
  // Data that is not in the backend
  progress: number;
  curriculumName: string;
  focusName: string;
  trainerName: string;
  cotrainerName: string;
}

export interface BatchStatus {
  batchStatusID: number;
  batchStatusName: String;
}

export interface BatchLocation {
  locationId: number;
  locationName: String;
  buildingId: number;
  buildingName: String;
  roomId: number;
  roomName: String;
}
