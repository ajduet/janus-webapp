import {Bucket} from './bucket';

//Question entity we receive from database, this is used for showing question and answer data to the screener
export interface Question{
    questionID: number;
    questionText: string;
    sampleAnswer1: string;
    sampleAnswer2: string;
    sampleAnswer3: string;
    sampleAnswer4: string;
    sampleAnswer5: string;
    isActive: boolean; //For Admin UI team
    bucketId: Bucket; //For Database consistency SUBJECT TO CHANGE


}