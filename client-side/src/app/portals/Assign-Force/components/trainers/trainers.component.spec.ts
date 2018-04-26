import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppMaterialModule } from '../../material.module';
import { TrainerItemComponent } from './trainer-item/trainer-item.component';
import { TrainersComponent } from './trainers.component';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { Trainer } from '../../model/Trainer';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let trainerService: TrainerControllerService;

  class MockTrainerService {
    findAll() {}
  }

  let mockClient;

  beforeEach(() => {
    mockClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      declarations: [TrainersComponent, TrainerItemComponent],
      imports: [AppMaterialModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        { provide: TrainerControllerService, useClass: MockTrainerService },
        { provide: HttpClient, useValue: mockClient }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    trainerService = TestBed.get(TrainerControllerService);
    mockClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // add trainer
  it(
    'should receive all of the trainers data',
    async(() => {
      const trainers: Trainer[] = [];
      mockClient.get.and.returnValue(
        Observable.create(observer => {
          observer.next(trainers);
        })
      );
      const dataServiceSpy = spyOn(trainerService, 'findAll').and.returnValue(
        Observable.create(observer => {
          observer.next(trainers);
        })
      );

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.trainers).toBeTruthy();
      });
    })
  );
});
