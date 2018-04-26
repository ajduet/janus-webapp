import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesTimelineFilterComponent } from './batches-timeline-filter.component';
import { AppMaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';

describe('BatchesTimelineFilterComponent', () => {
  let component: BatchesTimelineFilterComponent;
  let fixture: ComponentFixture<BatchesTimelineFilterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AppMaterialModule,
          ReactiveFormsModule,
          FormsModule,
          HttpClientTestingModule,
          BrowserAnimationsModule
        ],
        declarations: [BatchesTimelineFilterComponent],
        providers: [
          CurriculumControllerService,
          FocusControllerService,
          AddressControllerService,
          RoomControllerService,
          BuildingControllerService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTimelineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
