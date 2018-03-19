import {Screening} from "./screening";
import {ViolationType} from "./violationType";

//SoftSkill violation that occurs 
export interface SoftSkillViolation{
    violationID: number;
    screeningID: Screening;
    violationType: ViolationType;
    Time: Date;
    Comment: string;
}