import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BatchService} from '../services/batch.service';
import {SettingsService} from '../services/global-settings.service';
import {NotificationService} from '../services/notification.service';
import {TrainerService} from '../services/trainer.service';
import {CurriculaService} from '../services/curricula.service';
import {By} from '@angular/platform-browser';
import {MatDatepickerModule, MatMenuModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {ChartModule} from 'angular-highcharts';
import {ReplogicService} from '../replogic.service';
import {HttpClientModule} from '@angular/common/http';
import {Batch} from '../domain/batch';
import {Observable} from 'rxjs/Observable';

fdescribe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let settingService: SettingsService;
  let batchService: BatchService;
  let curriculaService: CurriculaService;
  let trainerService: TrainerService;
  let notificationService: NotificationService;
  let repLogicService: ReplogicService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatMenuModule, MatDatepickerModule, MatTableModule, MatSnackBarModule, ChartModule, HttpClientModule],
      declarations: [ ReportsComponent],
      providers: [SettingsService, BatchService, CurriculaService, TrainerService, NotificationService, ReplogicService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    repLogicService = TestBed.get(ReplogicService);
    settingService = TestBed.get(SettingsService);
    batchService = TestBed.get(BatchService);
    curriculaService = TestBed.get(CurriculaService);
    trainerService = TestBed.get(TrainerService);
    notificationService = TestBed.get(NotificationService);
    el = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();
  });

  it('content hidden when batch not avaliable', fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('');
    spyOn(batchService, 'getAll').and.returnValue(Observable.create());
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('');

  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
