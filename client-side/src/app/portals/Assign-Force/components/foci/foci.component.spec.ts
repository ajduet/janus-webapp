import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { FociComponent } from './foci.component';
import { Focus } from '../../model/Focus';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';

describe('FociComponent', () => {
  let component: FociComponent;
  let fixture: ComponentFixture<FociComponent>;
  const testData: Focus[] = [
    new Focus(1, 'Test Focus', false, [{ id: 1, name: 'Test Skill', active: true }]),
    new Focus(2, 'Test Focus 2', true, [{ id: 1, name: 'Test Skill', active: true }])
  ];
  let focusControllerService = FocusControllerService;

  class MockFocusControllerService {
    findAll(): Observable<Focus[]> {
      return Observable.of(testData);
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, BrowserAnimationsModule],
        declarations: [FociComponent],
        providers: [{ provide: FocusControllerService, useClass: MockFocusControllerService }]
      }).compileComponents();
      focusControllerService = TestBed.get(FocusControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FociComponent);
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

  it('should contain the focus name', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.focus-name').textContent).toContain(component.focusData[0].name);
  });

  it('should contain the skills for the focus', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.focus-skills').textContent).toContain(component.focusData[0].skills[0].name);
  });

  it('should contain an accordion for the focuses', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-accordion')).toBeTruthy();
  });

  it('should contain a title named Focuses', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-panel-title').textContent).toContain('Focuses');
  });
});
