import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Curriculum } from '../../model/Curriculum';
import { Skill } from '../../model/Skill';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { CoreComponent } from '../core/core.component';
import { CurriculumSkillsComponent } from '../curriculum-skills/curriculum-skills.component';
import { FociComponent } from '../foci/foci.component';
import { CurriculaComponent } from './curricula.component';
import { Focus } from '../../model/Focus';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';

describe('CurriculaComponent', () => {
  let component: CurriculaComponent;
  let fixture: ComponentFixture<CurriculaComponent>;
  const testData: Curriculum[] = [
    new Curriculum(1, 'Test Curriculum', true, [], [{ id: 1, name: 'Test Skill', active: true }]),
    new Curriculum(2, 'Test Curriculum 2', true, [], [{ id: 1, name: 'Test Skill', active: true }])
  ];
  const testData2: Skill[] = [new Skill(1, 'Test Skill', true), new Skill(2, 'Test Skill 2', true)];
  const testData3: Focus[] = [new Focus(0, 'Test Focus', true, []), new Focus(0, 'Test Focus 2', true, [])];
  let skillControllerService = SkillControllerService;
  let curriculumControllerService = CurriculumControllerService;
  let focusControllerService = FocusControllerService;

  class MockCurriculaService {
    findAll(): Observable<Curriculum[]> {
      return Observable.of(testData);
    }
  }

  class MockSkillControllerService {
    findAll(): Observable<Skill[]> {
      return Observable.of(testData2);
    }
  }

  class MockFocusControllerService {
    findAll(): Observable<Focus[]> {
      return Observable.of(testData3);
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, BrowserAnimationsModule],
        declarations: [CurriculaComponent, CoreComponent, FociComponent, CurriculumSkillsComponent],
        providers: [
          { provide: CurriculumControllerService, useClass: MockCurriculaService },
          { provide: SkillControllerService, useClass: MockSkillControllerService },
          { provide: FocusControllerService, useClass: MockFocusControllerService }
        ]
      }).compileComponents();
      curriculumControllerService = TestBed.get(CurriculumControllerService);
      skillControllerService = TestBed.get(SkillControllerService);
      focusControllerService = TestBed.get(FocusControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
