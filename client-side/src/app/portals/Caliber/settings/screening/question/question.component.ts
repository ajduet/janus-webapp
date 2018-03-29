import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../entities/Question';
import { Bucket } from '../entities/Bucket';
import { Tag } from '../entities/Tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TAGS } from '../mock-tag';
import {Questions} from '../mock-questions-array'
import {QuestionsService} from '../services/questions.service';
import {TagsService} from '../services/tags.service';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
import {BucketsService} from '../services/buckets.service';
import { SkillType } from '../entities/SkillType';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import {AlertsService} from '../../../services/alerts.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations:[
    trigger('move',[
      state('center',style({
        transform:'translateX(0) scaleX(1)'
      })),
      state('left',style({
        transform:'translateX(-28%) scaleX(1)'

      })),
      transition('center =>left',animate('300ms ease-in')),
    ]),
  ]
})
export class QuestionComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private tagsService: TagsService,
    private questionService: QuestionsService,
    private bucketService: BucketsService,
    private alertsService:AlertsService) { }

  newTagString : string;
  createQuestion: FormGroup;
  newQuestion: Question;
  newTags: Tag[];
  allTags: Tag[];
  currentTags: Tag[];
  question:Question;
  sampleAnswers: string[];
  questions: Question[];
  filter: Tag = new Tag();
  currentBucket: Bucket;
  public answersCollapsed = true;
  public tagsCollapsed = true;
  state;



  ngOnInit() {
    this.currentBucket = this.bucketService.getCurrentBucket();
    this.currentTags = [];
    this.question = new Question();
    this.sampleAnswers = [this.question.sampleAnswer1,this.question.sampleAnswer2,this.question.sampleAnswer3,this.question.sampleAnswer4,this.question.sampleAnswer5];
    this.updateQuestions();
  }

  /**
   * Used to open a bootstrap modal
   * Takes in the Id of the modal and launches it
   **/
  open(content) {
    this.modalService.open(content, { windowClass: 'fixed-modal' });
  }

  /**
   * Used to validate the create/update question form
   **/
  initFormControl() {
    this.createQuestion = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  /**
   * A currently unused function that will give the reason for a modal closing
   * May be used later for giving different results based on how a modal is closed
   **/
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /**
   * Switches the question sent in as an argument from active to deactive
   * or from deactive to active based on it's current status
   **/
  changeQuesitonStatus(question){
    if(question.isActive){
      question.isActive = false;
      this.questionService.deactivateQuestion(question.questionId).subscribe();
   }
    else{
      question.isActive = true;
      this.questionService.activateQuestion(question.questionId).subscribe();
   }
  }

  /**
   * A simple function that nullifies the currently selected question to
   * be used primarily after a successful save
   **/
  setQuestionNull(){
    this.question = new Question();
    this.sampleAnswers = [];
    this.currentTags = [];
  }

  /**
   * This function will set the required fields of the selected
   * function to edit to help the  add new question function decide
   * wheather to add or update a question and to fill in the fields
   * with the selected questions sample answers and question text
   **/
  editQuestion(question){
    this.question = question;
    let i: number = 0;
    let j : number = 0;
    this.sampleAnswers = [this.question.sampleAnswer1,this.question.sampleAnswer2,this.question.sampleAnswer3,this.question.sampleAnswer4,this.question.sampleAnswer5];
    let newTags = [];
    this.tagsService.getAllTags().subscribe(data=>{
      this.allTags = (data as Tag[]);
    });
    this.tagsService.getTagByQuestion(this.question.questionId).subscribe(data=>{
      this.newTags = (data as Tag[]);
      console.log(this.newTags);
      this.removeTagsFromAll();
    });
  }

  /**
   * This function will take the string in the new tag input field
   * and create a new tag with no Id, then get the same tag with a valid
   * Id from the tag service
   **/
  newTag(){
    let newTag : Tag = new Tag();
    newTag.tagName = this.newTagString;
    if(this.newTagString){
      this.tagsService.createNewTag(this.newTagString).subscribe(data=>{
        newTag = (data as Tag);
        this.currentTags.push(newTag);
      });
      this.newTagString = "";
    }
  }

  /**
   * Converts the currently added Tag array into an array of tad ids for
   * saving and updating.
   **/
  getTagIds(){
    let tagIds : number[] =[];
    let i: number = 0;

    for(i;i<this.currentTags.length;i++){
      tagIds[i]=this.currentTags[i].tagId;
    }
    return tagIds;
  }

  /**
   * This function will check to see if all of the fields are filled
   * and to see if the questio has an Id already to decided wheather
   * to alert the user, add a new question, or to update a current
   * question.
   **/
  addNewQuestion(){
    this.tagsService.getAllTags().subscribe(data=>{
      this.allTags = (data as Tag[]);
    });
    let newCurrentTagIds : number[] = [];
    let i: number = 0;
    if(this.question){
      for(i; i < this.currentTags.length; i++){
        newCurrentTagIds.push(this.currentTags[i].tagId);
      }
   }
    else{
      this.currentTags=[];
    }
    if(this.sampleAnswers.length==5 && this.question.questionText){
      if(this.question.questionId){
        this.question.sampleAnswer1 = this.sampleAnswers[0];
        this.question.sampleAnswer2 = this.sampleAnswers[1];
        this.question.sampleAnswer3 = this.sampleAnswers[2];
        this.question.sampleAnswer4 = this.sampleAnswers[3];
        this.question.sampleAnswer5 = this.sampleAnswers[4];
        this.questionService.updateQuestion(this.currentBucket.bucketId,this.question, this.getTagIds()).subscribe();
        this.updatedSuccessfully();
      }
      else{
        this.question.sampleAnswer1 = this.sampleAnswers[0];
        this.question.sampleAnswer2 = this.sampleAnswers[1];
        this.question.sampleAnswer3 = this.sampleAnswers[2];
        this.question.sampleAnswer4 = this.sampleAnswers[3];
        this.question.sampleAnswer5 = this.sampleAnswers[4];
        this.questionService.createNewQuestion(this.currentBucket.bucketId,this.question,this.getTagIds()).subscribe();
        this.savedSuccessfully();
      }
      this.updateQuestions();
      this.setQuestionNull();
      this.sampleAnswers = [];
    }
    else{
      this.savedUnsuccessfull();
    }
  }

  /**
   * Adds the selected tag to the current tags array and removes it from the all tags array.
   **/
  addTagToQuestion(tag){
    let currentTag: any;
    let newAllTags : Tag[] = [];
    let i: number = 0;

    for(i; i < this.allTags.length; i++)
    {
      currentTag = this.allTags[i];
      if(tag && currentTag){
        if(tag.tagId != currentTag.tagId){
          newAllTags.push(currentTag);
        }
      }
    }
    this.allTags = newAllTags;
    this.currentTags.push(tag);
  }

   /**
    * Adds the selected tag to the all tags array and removes it from the current tags array
    **/
  removeTagFromQuestion(tag){
    let currentTag: any;
    let newCurrentTags : Tag[] = [];
    let i: number = 0;

    for(i; i < this.currentTags.length; i++)
    {
      currentTag = this.currentTags[i];
      if(tag.tagId != currentTag.tagId){
        newCurrentTags.push(currentTag);
      }
    }
    this.allTags.push(tag);
    this.currentTags = newCurrentTags;
  }

  /**
   * Resets the current tags and then re adds the tags specific to the current question.
   * Used to update a question by populating the current tags with the tags currently
   * associated with that question.
   **/
  removeTagsFromAll(){
    let i :number = 0;
    this.currentTags = [];
    for(i;i<this.newTags.length;i++){
      this.addTagToQuestion(this.newTags[i]);
    }
  }

  /**
   * Used to populate the current question and the current tags with a selected question to be
   * edited.
   **/
  updateQuestions(){
    if(this.currentBucket){
      this.questionService.getBucketQuestions(this.currentBucket.bucketId).subscribe(data=>{
        this.questions = (data as Question[]);
      })
      this.tagsService.getAllTags().subscribe(data=>{
        this.allTags = (data as Tag[]);
      });
    }
  }

  addNewTag(newTag : Tag){
    this.currentTags.push(newTag);
  }
  savedSuccessfully(){
    this.alertsService.success("Saved successfully");
  }
  updatedSuccessfully(){
    this.alertsService.success("Updated successfully");
  }
  savedUnsuccessfull(){
    this.alertsService.error("All Fields Must be Filled");
  }
}
