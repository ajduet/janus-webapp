import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAssociateFromBatchComponent } from './remove-associate-from-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SearchPipe } from '../../../pipes/search.pipe';
import { UsersService } from '../../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Batch } from '../../../models/batch.model';
import { BamUser } from '../../../models/bamuser.model';
import { SessionService } from '../../../services/session.service';
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

describe('RemoveAssociateFromBatchComponent', () => {
  let component: RemoveAssociateFromBatchComponent;
  let fixture: ComponentFixture<RemoveAssociateFromBatchComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveAssociateFromBatchComponent, SearchPipe],
      imports: [ HttpClientModule ],
      providers: [UsersService, {provide: SessionService, useClass: StubSessionService}],
      schemas: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAssociateFromBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
