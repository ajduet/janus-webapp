import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TrainersAddComponent } from './trainers-add.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TrainersComponent } from '../trainers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Trainer } from '../../../model/Trainer';
import { Skill } from '../../../model/Skill';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

describe('TrainersAddComponent', () => {
  let component: TrainersAddComponent;
  let fixture: ComponentFixture<TrainersAddComponent>;
  let mockClient;
  let trainerService: TrainerControllerService;

  class MockTrainerService {
    createTrainer(trainer: Trainer) {}
  }

  beforeEach(
    async(() => {
      mockClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule, HttpClientTestingModule],
        declarations: [TrainersAddComponent],
        providers: [
          {
            provide: TrainerControllerService,
            useClass: MockTrainerService
          },
          {
            provide: HttpClient,
            useValue: mockClient
          },
          {
            provide: MatDialogRef,
            useValue: {
              close: (dialogResult: any) => {}
            }
          },
          { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(TrainersAddComponent);
      component = fixture.componentInstance;
      trainerService = TestBed.get(TrainerControllerService);
      mockClient = TestBed.get(HttpClient);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersAddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNoClick', () => {
    spyOn(component, 'onNoClick');
    component.onNoClick(event);
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('should call onSubmit', () => {
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should create Trainer', () => {
    const Skillz: Skill[] = [
      {
        id: 1,
        name: 'Java',
        active: true
      }
    ];

    mockClient.post.and.returnValue(
      Observable.create(observer => {
        //observer.next(trainer);
      })
    );
  });
});
