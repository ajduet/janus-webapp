import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerItemComponent } from './trainer-item.component';
import { TrainersComponent } from '../trainers.component';
import { Skill } from '../../../model/Skill';
import { AppMaterialModule } from '../../../material.module';
import { Trainer } from '../../../model/Trainer';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainerItemComponent', () => {
  let component: TrainerItemComponent;
  let fixture: ComponentFixture<TrainerItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, HttpClientTestingModule],
        declarations: [TrainerItemComponent, TrainersComponent],
        providers: [TrainerControllerService, { provide: Router }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerItemComponent);
    component = fixture.componentInstance;
    component.trainer = new Trainer(1, '', '', [], null, false, null, []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test trainer deactivation
  it('should switch trainer to deactivated condition', () => {
    const Skillz: Skill[] = [
      {
        id: 1,
        name: 'Java',
        active: true
      }
    ];

    //component.removeTrainer(dummy);
    //expect(dummy.active).toBe(false);
  });

  // test trainer reactivation
  it('should switch trainer to active condition', () => {
    const Skillz: Skill[] = [
      {
        id: 1,
        name: 'Java',
        active: true
      }
    ];

    const dummy = {
      trainerId: 1,
      firstName: 'James',
      lastName: 'Smith',
      skills: Skillz,
      certifications: 'Certs',
      active: true,
      resume: 'Resume',
      unavailabilities: []
    };

    //component.activateTrainer(dummy);
    //expect(dummy.active).toBe(true);
  });
});
