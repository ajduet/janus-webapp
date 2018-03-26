import { Bucket } from '../entities/bucket';
import { Question } from '../entities/question';
import { SkillTypeBucketLookUp } from '../entities/skillTypeBucketLookup';

export class QuestionsToBucketsUtil {

  buckets: Bucket[] = [];

  saveQuestions(allQuestions: Question[], allBuckets: SkillTypeBucketLookUp): Bucket[] {
    allQuestions.forEach(question => {
      // If the buckets array is empty, add this question's bucket to it
      if (this.buckets.length == 0) {
        let matchingBucket = allBuckets.buckets.find(function(element) {
          return element.bucketID == question.bucketId;
        });
        // After adding the new bucket, add the current question to the new bucket
        if (matchingBucket) {
          this.buckets.push(matchingBucket);
          this.buckets[this.buckets.length-1].questions = [];
          this.buckets[this.buckets.length-1].questions.push(question);
        }
      // If the bucket array is not empty, check to see if this question's bucket is already listed
      } else {
        let existingBucket = this.buckets.find(function(element) {
          return element.bucketID == question.bucketId;
        });
        // If this question's bucket is not listed, add it
        if (!existingBucket) {
          let matchingBucket = allBuckets.buckets.find(function(element) {
            return element.bucketID == question.bucketId;
          });
          // After adding the new bucket, add the current question to the new bucket
          if (matchingBucket) {
            this.buckets.push(matchingBucket);
            this.buckets[this.buckets.length-1].questions = [];
            this.buckets[this.buckets.length-1].questions.push(question);
          }
        // If the bucket exists, add question to it
        } else {
          this.buckets[this.buckets.indexOf(existingBucket)].questions.push(question);
        }
      }
      
    });
    return this.buckets;
  }

  /* OLD bucket only, converted to SkillTypeBucket
  saveQuestions(allQuestions: Question[], allBuckets: Bucket[]): Bucket[] {
    allQuestions.forEach(question => {
      // If the buckets array is empty, add this question's bucket to it
      if (this.buckets.length == 0) {
        let matchingBucket = allBuckets.find(function(element) {
          return element.bucketID == question.bucketId;
        });
        // After adding the new bucket, add the current question to the new bucket
        if (matchingBucket) {
          this.buckets.push(matchingBucket);
          this.buckets[this.buckets.length-1].questions = [];
          this.buckets[this.buckets.length-1].questions.push(question);
        }
      // If the bucket array is not empty, check to see if this question's bucket is already listed
      } else {
        let existingBucket = this.buckets.find(function(element) {
          return element.bucketID == question.bucketId;
        });
        // If this question's bucket is not listed, add it
        if (!existingBucket) {
          let matchingBucket = allBuckets.find(function(element) {
            return element.bucketID == question.bucketId;
          });
          // After adding the new bucket, add the current question to the new bucket
          if (matchingBucket) {
            this.buckets.push(matchingBucket);
            this.buckets[this.buckets.length-1].questions = [];
            this.buckets[this.buckets.length-1].questions.push(question);
          }
        // If the bucket exists, add question to it
        } else {
          this.buckets[this.buckets.indexOf(existingBucket)].questions.push(question);
        }
      }
      
    });
    return this.buckets;
  }
  */

}