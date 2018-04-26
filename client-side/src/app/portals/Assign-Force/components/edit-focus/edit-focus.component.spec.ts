import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { EditFocusComponent } from './edit-focus.component';
import { Focus } from '../../model/Focus';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';

describe('EditFocusComponent', () => {
  let component: EditFocusComponent;
  let fixture: ComponentFixture<EditFocusComponent>;
  const mockFocusData: Focus = {
    id: 1,
    name: 'Test Focus',
    active: true,
    skills: [{ id: 1, name: 'Test Skill', active: true }]
  };
  const testData: Skill[] = [new Skill(1, 'Test Skill', true), new Skill(2, 'Test Skill 2', true)];
  let skillControllerService: SkillControllerService;
  let focusControllerService: FocusControllerService;

  class MockSkillService {
    findAll(): Observable<Skill[]> {
      return Observable.of(testData);
    }
  }

  class MockFocusControllerService {
    update(focus: Focus) {}
  }

  class MockDialogRef {
    close() {}
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EditFocusComponent],
        providers: [
          { provide: MatDialogRef, useClass: MockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: mockFocusData },
          { provide: SkillControllerService, useClass: MockSkillService },
          { provide: FocusControllerService, useClass: MockFocusControllerService }
        ],
        imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule]
      }).compileComponents();
      skillControllerService = TestBed.get(SkillControllerService);
      focusControllerService = TestBed.get(FocusControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name variable populated with current name of focus', () => {
    fixture.detectChanges();
    expect(component.data.name).toContain('Test Focus');
  });
});
