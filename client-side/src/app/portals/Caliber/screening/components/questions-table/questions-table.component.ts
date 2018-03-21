import { Component, OnInit } from '@angular/core';

// Entities
import { Question } from '../../entities/question';
import { Bucket } from '../../entities/bucket';

// Services
import { BucketService } from '../../services/bucket.service';
import { QuestionService } from '../../services/question.service';

// Utility Class (setting up buckets and questions based on selected tags)
import { QuestionsToBucketsUtil } from '../../util/questionsToBuckets.util';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit {

  answeredQuestions: Question[] = [];
  buckets: Bucket[];
  currentCategory: Bucket;
  constructor(private bucketService: BucketService, private questionService: QuestionService, private filteredBuckets: QuestionsToBucketsUtil) {
    let tempBuckets: Bucket[];
    this.bucketService.getBuckets().subscribe(data => {
      tempBuckets = data;
    });
    let tempQuestions: Question[];
    this.questionService.getQuestions().subscribe(data => {
      tempQuestions = data;
    });
    this.buckets = this.filteredBuckets.saveQuestions(tempQuestions, tempBuckets);
  }

  ngOnInit() {
  }

  setBucket(bucketID: number) {
    for (let bucket of this.buckets)
      if (bucket.bucketID == bucketID)
        this.currentCategory = bucket;
  }

  open(question:Question){
    this.answeredQuestions.push(question);
  }

  isAnsweredQuestion(question: Question): boolean{
    for(let q of this.answeredQuestions){
      if(q.questionID == question.questionID)
        return true;
    }
  }
}
