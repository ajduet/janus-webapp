import {QuestionScore} from "./questionScore";

//A list of questions answered by the candidate
export interface ScreenerBucket{
    bucketName: string;
    questionScores: QuestionScore[];
}
