import 'rxjs/add/observable/of';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillsComponent } from './skills.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';

class MockSkillService {
  skills: Skill[] = [
    { id: 1, name: 'Java', active: true },
    { id: 2, name: 'SQL', active: true },
    { id: 3, name: 'Angular', active: true },
    { id: 4, name: 'C++', active: true }
  ];

  findAll(): Observable<Skill[]> {
    return Observable.of(this.skills);
  }
  remove(skill: Skill): Observable<Skill> {
    return Observable.of(this.skills.pop());
  }
}

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let skillService: SkillControllerService;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, HttpClientTestingModule],
        declarations: [SkillsComponent],
        providers: [
          {
            provide: SkillControllerService,
            useClass: MockSkillService
          },
          TrainerControllerService
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(SkillsComponent);
      component = fixture.componentInstance;
      skillService = TestBed.get(SkillControllerService);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // //TEST: getAllSkills should get all skills the teacher does and doesn't have, should be 4 because the component trainer has no skills currently
  // it('should return a skill array', () => {
  //   skillService.findAll().toPromise().then(skills => {
  //     console.log(skills);
  //     component.skillsList = skills;
  //     expect(component.skillsList.length).toBe(4, 'get all skills not fetching properly');
  //   });
  // });

  // it('should remove Java from the skillsList', () => {
  //   skillService.findAll().toPromise().then(skills=>{
  //     component.skillsList = skills;
  //     component.remove({ id: 1, name: 'Java', active: true });
  //     expect(component.skillsList.length).toBe(3, 'skill not properly removed');
  //   });
  // });
});
