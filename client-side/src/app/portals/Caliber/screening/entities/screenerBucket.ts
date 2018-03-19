import {Question} from "./question";

//A list of questions answered by the candidate
export interface ScreenerBucket{
    bucketID: number;
    questions: Question[];
}
