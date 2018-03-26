import { Bucket } from './bucket';
import { SkillType } from './skillType';
//The Buckets received from the database, used to track which questions belong to which buckets
export interface SkillTypeBucketLookUp{
    skillTypeBucketLookupID: number;
    skillType: SkillType;
    buckets: Bucket[];
    weight: number[];
}