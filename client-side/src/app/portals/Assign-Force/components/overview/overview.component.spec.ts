import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../../material.module';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { OverviewComponent } from './overview.component';
import { UrlService } from '../../services/url/url.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
        providers: [UrlService, BatchControllerService],
        declarations: [OverviewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute weeks', () => {
    const date1 = new Date(2018, 3, 1).valueOf();
    const date2 = new Date(2018, 4, 1).valueOf();
    expect(component.computeNumOfWeeksBetween(date1, date2)).toEqual(4);
  });

  it('should not compute to be negative', () => {
    const date1 = new Date(2018, 4, 1).valueOf();
    const date2 = new Date(2018, 3, 1).valueOf();
    expect(component.computeNumOfWeeksBetween(date1, date2)).toEqual(4);
  });

  it('current week should be positive', () => {
    const date1 = new Date(2017, 4, 1).valueOf();
    expect(component.getCurrentWeekOfBatch(date1)).toBeGreaterThan(0);
  });

  it('current week should be negative', () => {
    const date1 = new Date(9999, 4, 1).valueOf();
    expect(component.getCurrentWeekOfBatch(date1)).toBeLessThan(0);
  });

  it('progress should not be 0', () => {
    const batch = {
      startDate: new Date(0, 0, 0).valueOf(),
      endDate: new Date(1, 1, 1).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toBeGreaterThan(0);
  });

  it('progress should be 0', () => {
    const batch = {
      startDate: new Date(9998, 0, 0).valueOf(),
      endDate: new Date(9999, 1, 1).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toEqual(0);
  });

  it('progress should be still be 0', () => {
    const batch = {
      startDate: new Date(9990, 0, 0).valueOf(),
      endDate: new Date(9999, 0, 0).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toEqual(0);
  });
});
