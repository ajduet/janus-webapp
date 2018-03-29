import {Question} from './question';

//The Buckets received from the database, used to track which questions belong to which buckets
export interface Bucket{
    bucketID: number;
    bucketCategory: string;
    bucketDescription: string;
    isActive: boolean;
    questions: Question[];
}