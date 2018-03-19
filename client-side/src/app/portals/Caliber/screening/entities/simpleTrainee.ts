
//DB Entity for the potential employee being screened
export interface SimpleTrainee{
    traineeID: number;
    firstname: string;
    lastname: string;
    trackId: number;
    schedule: Date;//for the scheduled start time
}
