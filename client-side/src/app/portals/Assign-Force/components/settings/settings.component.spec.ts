import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let settingService;
  let addressService;
  let buildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatGridListModule,
        MatSelectModule,
        MatProgressBarModule,
        MatCardModule,
        HttpClientTestingModule
      ],
      declarations: [SettingsComponent],
      providers: [AddressControllerService, BuildingControllerService, SettingControllerService]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingService = TestBed.get(SettingControllerService);
    addressService = TestBed.get(AddressControllerService);
    buildingService = TestBed.get(BuildingControllerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
