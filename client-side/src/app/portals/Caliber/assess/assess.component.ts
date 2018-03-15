import { Component, OnInit, NgModule, ViewEncapsulation, ElementRef} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';
import { Batch } from '../entities/Batch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';
import { AssessmentService } from '../services/assessment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GradeService } from '../services/grade.service';
import { Grade } from '../entities/Grade';
import { Trainee } from '../entities/Trainee';
import { SkillsService } from '../services/category.service';
import { Skill } from '../entities/Category';
import { Note } from '../entities/Note';
import { NoteService } from '../services/note.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeByTraineeByAssessmentPipe } from '../pipes/grade-by-trainee-by-assessment.pipe';
import { NoteByTraineeByWeekPipe } from '../pipes/note-by-trainee-by-week.pipe';
import { DatePipe } from '@angular/common';
import { ScrollEvent } from 'ngx-scroll-event';
import { window } from 'rxjs/operators/window';
import { HostListener } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class AssessComponent implements OnInit {

  pageOffsetValue;

  getPageOffsetHeight(event: ScrollEvent) {
    this.pageOffsetValue = pageYOffset;
  }

  assessment: Assessment;

  batches: Batch[] = [];
  assessments: Assessment[] = [];
  selectedBatch: Batch = new Batch();
  grades: Grade[] = [];
  updatingGrades: Set<Grade> = new Set<Grade>();
  selectedWeek: number;
  categories: Skill[] = [];
  notes: Note[] = [];
  rForm: FormGroup;

  newAssessment: Assessment = new Assessment();
  editingAssessment: Assessment = new Assessment();
  selectedAssessment: Assessment = new Assessment();

  years: Set<any> = new Set<any>();
  currentYear = 0;
  yearBatches: Batch[] = [];
  selectedTrainees: Trainee[] = [];

  constructor(private modalService: NgbModal, private batchService: BatchService, private assessmentService: AssessmentService,
  private gradeService: GradeService, private categoryService: SkillsService, private noteService: NoteService,
  private fb: FormBuilder, private datePipe: DatePipe) {

  }

  // This event is called when the user switches tabs (for Weeks).
  fetchNews(evt: any) {
    const id = evt.nextId;

    if (id === '+') {
      this.modalService.open(document.getElementById('addWeek'));
      return;
    } else {
      this.getAssessments(id);
      this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, id);
      this.selectedWeek = id;
      this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, id);
    }
  }


  ngOnInit() {

    this.selectedWeek = 1;

    this.batchService.fetchAll();

    this.categoryService.fetchAllActive();

    this.noteService.getList().subscribe(notes => {
      this.notes = notes;
    });

    this.assessmentService.getList().subscribe(assessment => this.assessments = assessment);

    this.gradeService.listSubject.subscribe(grade => this.grades = grade);

    this.gradeService.saveSubject.subscribe(grade => {
      this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    });

    this.categoryService.listSubject.subscribe(categories => {
      this.categories = categories;
      this.newAssessment.category = this.findCategory('Java');
    });

    this.batchService.getList().subscribe(batch => {
      this.batches = batch;

      if (this.batches.length !== 0) {

        // Set the year dropdown.
        this.batches.forEach(b => {
          this.years.add(this.datePipe.transform(b.startDate, 'yyyy'));
          const sDate = new Date(b.startDate);
          if (sDate.getFullYear() > this.currentYear){
            this.currentYear = sDate.getFullYear();
          }
        });

        this.switchYear(this.currentYear);
        this.changeBatch(this.yearBatches[0]);
        this.selectedWeek = this.selectedBatch.weeks;
      }
    });

    // Every time an assessment is created, a set of default grades is created.
    this.assessmentService.getSaved().subscribe(assessment => {

      this.selectedBatch.trainees.forEach(trainee => {
        const grade = new Grade();
        grade.trainee = trainee;
        grade.score = 0;
        grade.assessment = assessment;
        const newDate = new Date();
        grade.dateReceived = new Date('01-01-2000');
        this.gradeService.create(grade);
      });

    });

  }

/****************************************************************************************
                                      ASSESSMENTS
*****************************************************************************************/

  editAssessment(content, modalAssessment: Assessment) {
    this.editingAssessment = modalAssessment;
    this.modalService.open(content);
  }

  updateAssessment() {
    this.assessmentService.update(this.editingAssessment);
  }

  deleteAssessment() {
    this.assessments.forEach(a => {
      if (Number(a.assessmentId) === Number(this.editingAssessment.assessmentId)) {
        this.assessments.splice(this.assessments.indexOf(a), 1);
      }
    });
    this.assessmentService.delete(this.editingAssessment);
  }

  addAssessment() {
    this.newAssessment.week = this.selectedWeek;
    this.newAssessment.batch = this.selectedBatch;
    this.assessmentService.create(this.newAssessment);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

/****************************************************************************************
                                      CATEGORIES
*****************************************************************************************/

  editCategory(categorySelect: ElementRef) {
    const newCategory = $(categorySelect).find(':selected').val();
    this.editingAssessment.category = this.findCategory(newCategory);
  }

  changeCategory(categorySelect: ElementRef) {
    const newCategory = $(categorySelect).find(':selected').val();
    this.newAssessment.category = this.findCategory(newCategory);
  }

  findCategory(category: any): Skill {
    let matchingCat;
    this.categories.forEach(element => {

      if (element.skillName === category) {
        matchingCat = element;
      }
    });

    return matchingCat;
  }


/****************************************************************************************
                                      GRADES
*****************************************************************************************/

  updateGrade(trainee: Trainee, assessment: Assessment, input) {
    const grade = this.getGrade(trainee, assessment);
    grade.score = Number(input.value);
    grade.dateReceived = '2000-01-01T01:01:01.000Z';
    this.updatingGrades.add(grade);
    this.gradeService.update(grade);
  }

  getGrade(trainee: Trainee, assessment: Assessment) {
    const grade = new GradeByTraineeByAssessmentPipe().transform(this.grades, trainee, assessment)[0];

    if (grade != null) {
      return grade;
    } else {
      const tempGrade = new Grade();
      tempGrade.score = 0;
      tempGrade.assessment = assessment;
      tempGrade.trainee = trainee;
      return tempGrade;
    }
  }

  getPercentage(assessment: Assessment) {
    let sum = 0;
    this.assessments.forEach(a => {
      sum += a.rawScore;
    });

    return Math.round((assessment.rawScore / sum) * 100);
  }

  getOverallAverage() {
    let total = 0;

    this.assessments.forEach(a => {
      let sum = 0;
      const percentage = this.getPercentage(a);

      this.selectedBatch.trainees.forEach(trainee => {
        sum += (this.getGrade(trainee, a).score * percentage) / 100;
      });

      sum /= this.selectedBatch.trainees.length;
      total += sum;
    });

    return total;
  }

  getAssessmentAverage(assessment: Assessment) {
    let total = 0;

    this.selectedBatch.trainees.forEach(trainee => {
      total += this.getGrade(trainee, assessment).score;
    });

    return total / this.selectedBatch.trainees.length;
  }

/****************************************************************************************
                                      NOTES
*****************************************************************************************/

  getNote(trainee: Trainee) {
    let note: Note;
    note = new NoteByTraineeByWeekPipe().transform(this.notes, trainee, this.selectedWeek);
    if (note.content === undefined) {
      note.content = '';
    }
    return note;
  }

  getWeekBatchNote(batch: Batch): Note {
    const n = this.notes.filter( (note) => {
      return (note.type === 'BATCH' && Number(note.week) === Number(this.selectedWeek));
    })[0];

    if (n != null) {
      if (n.content === undefined) {
        n.content = 'u';
      }
      return n;
    } else {
      const nNote = new Note();
      nNote.content = null;
      nNote.batch = this.selectedBatch;
      nNote.maxVisibility = '3';
      nNote.qcFeedback = false;
      nNote.week = this.selectedWeek;
      nNote.type = 'BATCH';
      return nNote;
    }
  }

  addWeekOfNotes(week: number) {
    this.selectedBatch.trainees.forEach(trainee => {
      const note = new Note();
      note.content = ' ';
      note.trainee = trainee;
      note.batch = this.selectedBatch;
      note.maxVisibility = '2';
      note.qcFeedback = false;
      note.week = week;
      note.type = 'TRAINEE';
      this.noteService.create(note);
    });
    const note = new Note();
    note.batch = this.selectedBatch;
    note.maxVisibility = '3';
    note.qcFeedback = false;
    note.week = week;
    note.type = 'BATCH';
    this.noteService.create(note);
  }

  updateNote(note: Note, input) {
    note.content = input.value;
    note.batch = this.selectedBatch;
    this.noteService.update(note);
  }

/****************************************************************************************
                                      OTHER
*****************************************************************************************/

  open(content) {
    this.modalService.open(content);
  }

  addWeek() {
    this.selectedBatch.weeks += 1;
    this.addWeekOfNotes(this.selectedBatch.weeks);
    this.batchService.update(this.selectedBatch);
    this.selectedWeek = this.selectedBatch.weeks;
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
  }

  changeYear(year: number) {
    this.currentYear = Number(year);
  }

  changeBatch(batch: Batch) {
      this.selectedWeek = batch.weeks;

    this.selectedBatch = batch;

    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);

    this.selectedTrainees = this.selectedBatch.trainees;
    this.selectedTrainees.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }

  switchBatch(id: number) {
    this.batches.forEach(batch => {

      if (Number(batch.batchId) === Number(id)) {
        this.changeBatch(batch);
      }
    });
  }

  switchYear(year: number) {
    this.currentYear = year;
    this.yearBatches = [];
    const y = new Date(year, 0, 1);
    for (const batch of this.batches){
      const batchYear = new Date(batch.startDate);
      if (batchYear.getFullYear() == y.getFullYear()) {
        this.yearBatches[this.yearBatches.length] = batch;
      }
    }
    if (this.yearBatches[0] != null){
      this.selectedWeek = this.yearBatches[0].weeks;
      this.switchBatch(this.yearBatches[0].batchId);

    }
  }

  counter(i: number) {
    return new Array(i);
  }

}
