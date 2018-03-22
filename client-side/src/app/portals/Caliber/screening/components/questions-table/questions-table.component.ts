import { Component, OnInit } from '@angular/core';

// Entities
import { Question } from '../../entities/question';
import { Bucket } from '../../entities/bucket';

// Services
import { BucketService } from '../../services/bucket.service';
import { QuestionService } from '../../services/question.service';

// Utility Class (setting up buckets and questions based on selected tags)
import { QuestionsToBucketsUtil } from '../../util/questionsToBuckets.util';

// Modal for answering the question
import { AnswerComponent } from '../answer/answer.component';

// ngbootstrap modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit {

  // Used to display the categories
  buckets: Bucket[];

  // holds the current category. Used to control
  // which questions are displayed in the questions table.
  currentCategory: Bucket;

  // Array of questions answered during the interview
  answeredQuestions: Question[] = [];

  constructor(private bucketService: BucketService, private questionService: QuestionService, 
    private filteredBuckets: QuestionsToBucketsUtil, private modalService: NgbModal) {
  }

  ngOnInit() {
    let tempBuckets: Bucket[];
    this.bucketService.getBuckets().subscribe(data => {
      tempBuckets = data;
    });
    let tempQuestions: Question[];
    this.questionService.getQuestions().subscribe(data => {
      tempQuestions = data;
    });
    // set the buckets array to all necessary categories.
    this.buckets = this.filteredBuckets.saveQuestions(tempQuestions, tempBuckets);
    // update the answeredQuestions variable in our service to track the
    // questions that have been given a score by the screener.
    this.questionService.currentAnsweredQuestions.subscribe(questions => this.answeredQuestions = Array.from(new Set(questions)))
  }

  // sets the current category, allowing for dynamic change
  // of the questions being displayed.
  setBucket(bucketID: number) {
    // iterate through each bucket
    for (let bucket of this.buckets)
    // if the current bucket's id matches the bucket id
    // of the category selected by the user
      if (bucket.bucketID == bucketID)
      // set the current category to the current bucket.
        this.currentCategory = bucket;
  }

  open(question:Question){
    // update the current selected question
    if(this.questionService.getSelectedQuestion() != question) {
      this.questionService.updateSelectedQuestion(question);
    }
    const modalRef = this.modalService.open(AnswerComponent);
    modalRef.componentInstance.question = question;
  }

  // used to display the green question mark on answered questions
  isAnsweredQuestion(question: Question): boolean{
    // iterate through the array of answered questions
    for(let q of this.answeredQuestions){
      // if the current question matches the question parameter
      if(q.questionID == question.questionID)
        // return true (allows the green check mark to appear)
        return true;
    }
  }
}
