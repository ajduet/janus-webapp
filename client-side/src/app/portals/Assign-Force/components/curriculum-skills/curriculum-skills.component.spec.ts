import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { CurriculumSkillsComponent } from './curriculum-skills.component';

describe('CurriculumSkillsComponent', () => {
  let component: CurriculumSkillsComponent;
  let fixture: ComponentFixture<CurriculumSkillsComponent>;
  const testData: Skill[] = [new Skill(1, 'Test Skill', true), new Skill(2, 'Test Skill 2', true)];
  let skillControllerService = SkillControllerService;

  class MockSkillControllerService {
    findAll(): Observable<Skill[]> {
      return Observable.of(testData);
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CurriculumSkillsComponent],
        imports: [AppMaterialModule, BrowserAnimationsModule],
        providers: [{ provide: SkillControllerService, useClass: MockSkillControllerService }]
      }).compileComponents();
      skillControllerService = TestBed.get(SkillControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-list', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-list')).toBeTruthy();
  });

  it('should contain the skill name', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.skill-name').textContent).toContain(component.skillData[0].name);
  });

  it('should contain an accordion for the skills', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-accordion')).toBeTruthy();
  });

  it('should contain a title named Skills', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-panel-title').textContent).toContain('Skills');
  });

  it('should have a remove button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.remove-button')).toBeTruthy();
  });

  it('should have an edit button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.edit-button')).toBeTruthy();
  });
});
