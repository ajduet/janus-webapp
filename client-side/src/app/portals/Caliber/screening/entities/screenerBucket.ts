import {Question} from "./question";

//A filtered topic for internal Screener usage ONLY
export interface ScreenerBucket{
    bucketID: number;
    questions: Question[];
}
