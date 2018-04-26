import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { Skill } from '../../model/Skill';
import { AddFocusComponent } from './add-focus.component';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { Focus } from '../../model/Focus';

describe('AddFocusComponent', () => {
  let component: AddFocusComponent;
  let fixture: ComponentFixture<AddFocusComponent>;
  let focusControllerService: FocusControllerService;
  let skillControllerService: SkillControllerService;
  const testData: Skill[] = [
    { id: 1, name: 'Test Skill', active: true },
    { id: 2, name: 'Test Skill 2', active: true }
  ];

  class MockDialogRef {
    close() {}
  }

  class MockFocusControllerService {
    create(focus: Focus) {}
  }

  class MockSkillControllerService {
    findAll(): Observable<Skill[]> {
      return Observable.of(testData);
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddFocusComponent],
        providers: [
          { provide: MatDialogRef, useClass: MockDialogRef },
          { provide: FocusControllerService, useClass: MockFocusControllerService },
          { provide: SkillControllerService, useClass: MockSkillControllerService }
        ],
        imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule]
      }).compileComponents();
      focusControllerService = TestBed.get(FocusControllerService);
      skillControllerService = TestBed.get(SkillControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a input field for focus name', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.focus-name-input')).toBeTruthy();
  });

  it('should contain a multi select element for skils', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.focus-skill-select')).toBeTruthy();
  });

  it('should contain a button labeled Add Focus', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.add-focus-button').textContent).toContain('Add Focus');
  });

  it('should create a new focus object when the new focus method is called', () => {
    component.newFocus();
    fixture.detectChanges();
    expect(component.focus.name).toBe('');
  });
});
