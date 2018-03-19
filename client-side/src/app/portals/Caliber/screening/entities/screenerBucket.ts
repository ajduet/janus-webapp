import {Question} from "./question";

//A filtered topic for internal Screener usage ONLY
export interface screenerBucket{
    bucketID: number;
    questions: Question[];
}