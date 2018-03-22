import { Tag } from "./tag";
import { SimpleTrainee } from "./simpleTrainee";
import { CaliberTrainer } from "./caliberTrainer";
import { SkillType } from "./skillType";

//All Data needed for the screening process
export interface Screening {
  screeningID: number;
  traineeID: SimpleTrainee;
  screenerID: CaliberTrainer;
  skillTypeID: SkillType;
  compositeScore: number;
  aboutMeCommentary: string;
  generalCommentary: string;
  softSkillCommentary: string;
  startDateTime: Date;
  endDateTime: Date;
  softSkillsVerdict: boolean;
  status: string;
}
