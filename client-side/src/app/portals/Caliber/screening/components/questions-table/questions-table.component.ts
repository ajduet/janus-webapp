import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription'; 

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
import { ScreeningService } from "../../services/screening/screening.service";
import { SimpleTraineeService } from "../../services/simpleTrainee/simple-trainee.service";

@Component({
  selector: "app-questions-table",
  templateUrl: "./questions-table.component.html",
  styleUrls: ["./questions-table.component.css"]
})

/*
After the candidate has given their introduction, 
the screener will proceed to the question-and-answer part of the interview. 
A list of questions will be fetched from the server / database, 
based on the skills that the screener input on the candidate introduction page. 
Screener will be able to see a set of category tabs, 
each of which has a set of questions in a table. 

Screener has the ability to navigate between tabs ad nauseam, 
asking whichever questions they desire. When a screener asks a question, 
it will invoke an instance of the question component.

Possible change for the future there are no programmatic constraints 
on how many questions a screener can ask, nor are there any constraints 
on what the proportion of questions must be (x% Java, y% HTML, z% SQL, etc). 
Future iterations may change this.
*/

export class QuestionsTableComponent implements OnInit, OnDestroy {
  // Used to display the categories
  questionBuckets: Bucket[];

  // holds the current category. Used to control
  // which questions are displayed in the questions table.
  currentCategory: Bucket;

  // value entered enables finish button
  generalComment: string;

  // Array of questions answered during the interview
  questionScores: QuestionScore[] = [];

  // The candidate's name
  candidateName: string;

  subscriptions: Subscription[] = [];

  constructor(
    private bucketService: BucketService,
    private questionService: QuestionService,
    private questionScoreService: QuestionScoreService,
    private questionsToBucketsUtil: QuestionsToBucketsUtil,
    private modalService: NgbModal,
    private screeningService: ScreeningService,
    private simpleTraineeService: SimpleTraineeService,
    private skillTypeBucketService: SkillTypeBucketService,
  ) {}

  ngOnInit() {
    // use skillTypeBucketLookup that provides array of buckets and array of weights
    // SkillType should come from SimpleTrainee***
    this.subscriptions.push(this.skillTypeBucketService.getSkillTypeBuckets(this.simpleTraineeService.getSelectedCandidate().skillTypeID).subscribe(bucketsWithWeights => {
      // save result locally and to service and as buckets
      this.skillTypeBucketService.bucketsByWeight = bucketsWithWeights;      
      this.subscriptions.push(this.questionService.getQuestions().subscribe(allQuestions => {
        this.questionBuckets = this.questionsToBucketsUtil.saveQuestions(allQuestions, bucketsWithWeights);
        this.skillTypeBucketService.bucketsByWeight.bucket = JSON.parse(JSON.stringify(this.questionBuckets));
        if (this.questionBuckets.length > 0) this.currentCategory = this.questionBuckets[0];
      }));
    }));

    /* old raw buckets with no weights*/
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

    this.candidateName = this.simpleTraineeService.getSelectedCandidate().firstname + " " +
                          this.simpleTraineeService.getSelectedCandidate().lastname;
    

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
    
    // update the answeredQuestions variable in our service to track the
    // questions that have been given a score by the screener.
    this.subscriptions.push(this.questionScoreService.currentQuestionScores.subscribe(
      questionScores => (this.questionScores = questionScores)
    ));
  }

  //Unsubscribe to prevent memory leaks when component is destroyed
  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe);
    if(this.questionBuckets != undefined) {
      for (let bucket of this.questionBuckets) {
        bucket.questions = [];
      }
    }
  }

  // sets the current category, allowing for dynamic change
  // of the questions being displayed.
  setBucket(bucketID: number) {
    // iterate through each bucket
    // if the current bucket's id matches the bucket id
    // of the category selected by the user
    for (let bucket of this.questionBuckets)
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
      if (q.questionId == question.questionId)
        // return true (allows the green check mark to appear)
        return true;
    }
  }

  submitAllowed(): boolean {
    let allowed: boolean = true;

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
