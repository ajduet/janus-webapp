import { SimpleTrainee } from "./simpleTrainee";
import { SkillType } from "./skillType";

export interface ScheduledScreening {
  scheduledScreeningId: number;
  trainee: SimpleTrainee;
  track: SkillType;
  status: string;
  trainer: number;
  scheduledDate: Date;
}
