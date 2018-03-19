import {Tag} from './tag';
import {SimpleTrainee} from './simpleTrainee';
import {CaliberTrainer} from './caliberTrainer';
import {Track} from './track';

//All Data needed for the screening process
export interface Screening{
    screeningID: number;
    traineeID: SimpleTrainee;
    screenerID: CaliberTrainer;
    trackID: Track;
    compositeScore: number;
    aboutMeCommentary: string;
    generalCommentary: string;
    softSkillCommentary: string;
    startDateTime: Date;
    endDateTime: Date;
    softSkillsVerdict: boolean;
    status: string;
}