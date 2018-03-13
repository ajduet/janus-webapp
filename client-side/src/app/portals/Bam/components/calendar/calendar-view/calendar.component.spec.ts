import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';
import { LocationStrategy } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { CalendarService } from '../../../services/calendar.service';
import { CalendarStatusService } from '../../../services/calendar-status.service';
import { AddSubtopicService } from '../../../services/add-subtopic.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { BamUser } from '../../../models/bamuser.model';
import { Subject } from 'rxjs/Rx';
import { Batch } from '../../../models/batch.model';
import { BatchType } from '../../../models/batchtype.model';

/**
 * @author David Graves, Cristian Hermida
 * @batch 1712
 * Had to stub SessionService. It retrieved an object from sessionStorage,
 * which is not available during testing. Had to provide mock data.
 */

export class StubSessionService {
  bamUser: BamUser;
  stubBatch: Batch;

  constructor() {
      this.bamUser = {
        'userId': 3,
        'fName': 'Ryan',
        'mName': null,
        'lName': 'Lessley',
        'email': 'rl@revature.com',
        'pwd': '1234',
        'role': 2,
        'batch': null,
        'phone': '1234567890',
        'phone2': '8675309',
        'skype': 'rl_skype',
        'pwd2': null,
        'minervaID': 9
    };
  }

  getSelectedBatch(): Batch {

    this.stubBatch = new Batch(12, 'name', new Date(), new Date(),
    this.bamUser, new BatchType(11, 'type', 200));

    return this.stubBatch;
  }

}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [HttpClientModule, RouterModule, RouterTestingModule.withRoutes([]) ],
      providers: [BatchService, { provide: SessionService, useClass: StubSessionService }, UsersService,
        LocationStrategy, AlertService, CalendarService, CalendarStatusService,
        AddSubtopicService, SubtopicService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
