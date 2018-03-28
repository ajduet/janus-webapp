import { SimpleTrainee } from "./simpleTrainee";
import { SkillType } from "./skillType";

export interface ScheduleScreening {
  scheduleScreeningId: number;
  trainee: SimpleTrainee;
  track: SkillType;
  status: string;
  interviewer: string;
}
