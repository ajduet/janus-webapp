import {Bucket} from '../entities/bucket';
import {SkillTypeBucketLookUp} from '../entities/skillTypeBucketLookUp';
import { SkillType } from "../entities/skillType";

export const SKILL_TYPE_BUCKET_LOOKUPS: SkillTypeBucketLookUp = 
    {
      skillTypeBucketLookupID: 1,
      skillType: {
          skillTypeID: 1,
          skillTypeName: 'Java EE/Microservices',
          isActive: true
      },
      buckets: [
        { bucketID: 1,
          bucketCategory: 'Basic Java',
          bucketDescription: 'OCA level Java questions',
          isActive: true,
          questions: null
        },
        { bucketID: 2,
          bucketCategory: 'SQL',
          bucketDescription: 'SQL database questions',
          isActive: true,
          questions: null
        },
        { bucketID: 3,
          bucketCategory: 'JavaScript',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 4,
          bucketCategory: 'HTML',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 5,
          bucketCategory: 'CSS',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 6,
          bucketCategory: 'Spring',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 7,
          bucketCategory: 'Angular',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        }
      ],
      weight: [14, 14, 14, 14, 14, 14, 16]
    }
    
  ;