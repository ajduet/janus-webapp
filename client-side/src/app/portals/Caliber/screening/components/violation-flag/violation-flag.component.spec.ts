import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationFlagComponent } from './violation-flag.component';

describe('ViolationFlagComponent', () => {
  let component: ViolationFlagComponent;
  let fixture: ComponentFixture<ViolationFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
