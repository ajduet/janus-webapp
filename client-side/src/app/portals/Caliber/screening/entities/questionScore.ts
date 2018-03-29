import { Question } from "./question";
import { Screening } from "./screening";

//Used for saving answered questions, consistent with DB
export interface QuestionScore {
  qSID: number; //Question Score ID consistent with DB naming
  questionId: number;
  screeningID: number;
  score: number;
  commentary: string;
  beginTime: Date;
}
