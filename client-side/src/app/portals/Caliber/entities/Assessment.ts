import { Batch } from './Batch';
import { Skill } from './Category';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: Batch;
    rawScore: number;
    type: string;
    week: number;
    category: Skill;
}
