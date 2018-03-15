import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainersComponent} from './trainers.component';
import {MinervaModule} from '../minerva.module';
import {APP_BASE_HREF} from '@angular/common';
import {Trainer} from '../domain/trainer';
import {Skill} from '../domain/skill';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MinervaModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeTrainerTest', function () {
    it('Tests to make sure the trainerRM.active is being marked as false', function () {
      const trainerRM: Trainer = {
        trainerId: '1',
        firstName: 'test',
        lastName: 'test',
        skills: [],
        skillsObject: [],
        resume: null,
        active: true,
        certifications: [],
        username: 'test'
      };
      component.removeTrainer(trainerRM);
      const actual = trainerRM.active;
      const should = false;
      expect(actual).toBe(should);
    });
  });

  describe('activateTrainerTest', function () {
    it('Tests to make sure the trainerRM.active is being marked as true', function () {
      const trainerRM: Trainer = {
        trainerId: '1',
        firstName: 'test',
        lastName: 'test',
        skills: [],
        skillsObject: [],
        resume: null,
        active: false,
        certifications: [],
        username: 'test'
      };
      component.activateTrainer(trainerRM);
      const actual = trainerRM.active;
      const should = true;
      expect(actual).toBe(should);
    });
  });

  describe('joinObjArrayByNameTest', function () {
    it('Testing to see if null is returned', function () {
      const elem: Skill[] = [{
        skillId: 1,
        skillName: null,
        active: true
      }];
      const actual = component.joinObjArrayByName(elem);
      const should = 'null';
      expect(actual).toBe(should);
    });
    it('Testing to see if 45 is returned', function () {
      const elem: Skill[] = [{
        skillId: 1,
        skillName: '45',
        active: true
      }];
      const actual = component.joinObjArrayByName(elem);
      const should = '45';
      expect(actual).toBe(should);
    });
  });
});
