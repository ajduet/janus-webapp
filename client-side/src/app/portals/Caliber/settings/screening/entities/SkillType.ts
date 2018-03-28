import { Bucket } from './Bucket';

export class SkillType{
    skillTypeId: number;
    skillTypeName: string;
    skillTypeDescription: string;
    isActive: boolean;
    buckets: Bucket[];
    weights: number[];
}


/** Suggested backend format */
// interface SkillType{
//     id: number,
//     bucket: Bucket[],
//     weights: number[]
// }

/** after changes */
// export class SkillType {
//   id: number;
//   name: string;
//   isActive: boolean;
//   buckets: Bucket[];
//   weights: number[];
// }
