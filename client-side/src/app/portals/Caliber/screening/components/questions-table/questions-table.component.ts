import { Component, OnInit } from "@angular/core";

// Entities
import { Question } from "../../entities/question";
import { Bucket } from "../../entities/bucket";
import { QuestionScore } from "../../entities/questionScore";

// Services
import { BucketService } from "../../services/bucket/bucket.service";
import { QuestionService } from "../../services/question/question.service";
import { QuestionScoreService } from '../../services/question-score/question-score.service';
import { SkillTypeBucketService } from '../../services/skillTypeBucketLookup/skill-type-bucket.service';
import { SkillTypeBucketLookUp } from '../../entities/skillTypeBucketLookup';

// Utility Class (setting up buckets and questions based on selected tags)
import { QuestionsToBucketsUtil } from "../../util/questionsToBuckets.util";

// Modal for answering the question
import { AnswerComponent } from "../answer/answer.component";

// ngbootstrap modal
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ScreeningService } from "../../services/screening/screenings.service";
import { SimpleTraineeService } from "../../services/simpleTrainee/simple-trainee.service";

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

  // The candidate's name
  candidateName: string;

  constructor(
    private bucketService: BucketService,
    private questionService: QuestionService,
    private questionScoreService: QuestionScoreService,
    private filteredBuckets: QuestionsToBucketsUtil,
    private modalService: NgbModal,
    private screeningService: ScreeningService,
    private simpleTraineeService: SimpleTraineeService,
    private SkillTypeBucketService: SkillTypeBucketService,
  ) {}

  ngOnInit() {
    // use skillTypeBucketLookup that provides array of buckets and array of weights
    let tempSkillTypeBucket: SkillTypeBucketLookUp;
    // SkillType should come from SimpleTrainee***
    let thisSkillTypeID = 1;
    this.SkillTypeBucketService.getSkillTypeBuckets(thisSkillTypeID).subscribe(data => {
      tempSkillTypeBucket = data;
      let tempQuestions: Question[];
      this.questionService.getQuestions().subscribe(data => {
        tempQuestions = data;
        this.filteredBuckets.saveQuestions(tempQuestions, tempSkillTypeBucket);
      });
    });

    /* old raw buckets with no weights*/

    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    // let tempBuckets: Bucket[];
    // // change to the getBucketsBySkillTypeID
    // this.bucketService.getBuckets().subscribe(data => {
    //   tempBuckets = data;
    //   let tempQuestions: Question[];
    //   this.questionService.getQuestions().subscribe(data => {
    //     tempQuestions = data;
    //     this.bucketService.setFilteredBuckets(
    //       this.filteredBuckets.saveQuestions(tempQuestions, tempBuckets)
    //     );
    //     this.buckets = this.bucketService.getFilteredBuckets();
    //   });
    // });


    
    // set the buckets array to all necessary categories.

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
    if (this.generalComment) {
      if (this.generalComment.length < 1) {
        allowed = false;
      }
    } else {
      allowed = false;
    }
    return !allowed;
  }

  saveFeedback() {
    this.screeningService.generalComments = this.generalComment;
  }

}
