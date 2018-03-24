import { Component, OnInit } from "@angular/core";

// Entities
import { Question } from "../../entities/question";
import { Bucket } from "../../entities/bucket";
import { QuestionScore } from "../../entities/questionScore";

// Services
import { BucketService } from "../../services/bucket/bucket.service";
import { QuestionService } from "../../services/question/question.service";
import { QuestionScoreService } from "../../services/question-score/question-score.service";

// Utility Class (setting up buckets and questions based on selected tags)
import { QuestionsToBucketsUtil } from "../../util/questionsToBuckets.util";

// Modal for answering the question
import { AnswerComponent } from "../answer/answer.component";

// ngbootstrap modal
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-questions-table",
  templateUrl: "./questions-table.component.html",
  styleUrls: ["./questions-table.component.css"]
})
export class QuestionsTableComponent implements OnInit {
  // Used to display the categories
  buckets: Bucket[];

  // holds the current category. Used to control
  // which questions are displayed in the questions table.
  currentCategory: Bucket;

  // value entered enables finish button
  generalComment: string;

  // Array of questions answered during the interview
  questionScores: QuestionScore[] = [];

  constructor(
    private bucketService: BucketService,
    private questionService: QuestionService,
    private questionScoreService: QuestionScoreService,
    private filteredBuckets: QuestionsToBucketsUtil,
    private modalService: NgbModal
  ) {}

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
    this.buckets = this.filteredBuckets.saveQuestions(
      tempQuestions,
      tempBuckets
    );

    // FOR FUTURE USE
    // let tempBuckets: Bucket[];
    // this.bucketService.getBuckets().subscribe(data => {
    //   tempBuckets = data;
    // });
    // let tempQuestions: Question[];
    // this.questionService.getFilteredQuestions().subscribe(data => {
    //   tempQuestions = data;
    // });
    // this.buckets = this.filteredBuckets.saveQuestions(
    //   tempQuestions,
    //   tempBuckets
    // );
    if (this.buckets.length > 0) this.currentCategory = this.buckets[0];
    // update the answeredQuestions variable in our service to track the
    // questions that have been given a score by the screener.
    this.questionScoreService.currentQuestionScores.subscribe(
      questionScores => (this.questionScores = questionScores)
    );
  }

  // sets the current category, allowing for dynamic change
  // of the questions being displayed.
  setBucket(bucketID: number) {
    // iterate through each bucket
    // if the current bucket's id matches the bucket id
    // of the category selected by the user
    for (let bucket of this.buckets)
      if (bucket.bucketID == bucketID)
        // set the current category to the current bucket.
        this.currentCategory = bucket;
  }

  open(question: Question) {
    const modalRef = this.modalService.open(AnswerComponent);
    modalRef.componentInstance.question = question;
  }

  // used to display the green question mark on answered questions
  isAnsweredQuestion(question: Question): boolean {
    // iterate through the array of question scores
    for (let q of this.questionScores) {
      // if the current question score's question ID matches the question parameter's id
      if (q.questionID == question.questionID)
        // return true (allows the green check mark to appear)
        return true;
    }
  }

  submitAllowed(): boolean {
    let allowed: boolean = true;
    if (this.questionScores) {
      if (this.questionScores.length < 1) {
        allowed = false;
      }
    } else {
      allowed = false;
    }
    if (this.generalComment){
      if (this.generalComment.length < 1) {
        allowed = false;
      }
    } else {
      allowed = false;
    }
    return (!allowed);
  }

}
