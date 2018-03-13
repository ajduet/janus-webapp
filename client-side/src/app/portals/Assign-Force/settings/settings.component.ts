import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Locations } from '../domain/locations';
import { NotificationService } from '../services/notification.service';
import { Building } from '../domain/building';
import { GlobalSettings } from '../domain/global-settings';
import { SettingsService } from '../services/global-settings.service';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedLocation = 'None';
  selectedBuilding = 'None';
  location: Locations;
  locations: Locations[];
  building: Building[];
  settings: any;
  trainersPerPage: number;
  reportGrads: number;
  batchLength: number;
  reportIncomingGrads: number;
  minBatchSize: number;
  maxBatchSize: number;
  trainerBreakDays: number;
  defaultBuilding: number;
  defaultLocation: number;

  constructor(private locationService: LocationService,
    private notificationService: NotificationService,
    private settingsService: SettingsService,
    private userInfo: UserInfoService) { }


  ngOnInit() {
    this.locationService.getAll().subscribe((list) => {
      this.locations = list;
    }, (err) => {
      this.showToast('Failed to fetch locations');
    });
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings[0];
      this.trainersPerPage = this.settings.trainersPerPage;
      this.reportGrads = this.settings.reportGrads;
      this.batchLength = this.settings.batchLength;
      this.reportIncomingGrads = this.settings.reportIncomingGrads;
      this.minBatchSize = this.settings.minBatchSize;
      this.maxBatchSize = this.settings.maxBatchSize;
      this.trainerBreakDays = this.settings.trainerBreakDays;
      this.defaultBuilding = this.settings.defaultBuilding;
      this.defaultLocation = this.settings.defaultLocation;
      // console.log(this.settings);
      this.locationService.getById(this.defaultLocation).subscribe((location) => {
        this.selectedLocation = location.name;
        this.location = location;
        this.building = location.buildings;
        const buildingOption = location.buildings.find(
          building => building.id === this.defaultBuilding);
        this.selectedBuilding = buildingOption.name;
      }, () => {
        this.showToast('Failed to fetch the location');
      });
    }, (err) => {
      this.showToast('Failed to fetch settings.');
    });
  }

  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }

  choosingLocation(location) {
    this.location = location;
    this.building = location.buildings;
    this.defaultLocation = location.id;
    const filteredBuilding = (this.building.filter(building => building.active === true))[0];
    this.selectedBuilding = filteredBuilding.name;
    this.defaultBuilding = filteredBuilding.id;
    // console.log(location.id + ' ' + this.defaultBuilding);
  }

  choosingBuilding(building) {
    this.settings.defaultBuilding = building.id;
    // console.log(building.id);
  }

  saveSettings() {
    this.settingsService.saveSettings(this.settings).subscribe(() => {
      this.showToast('settings updated.');
    }, (err) => {
      this.showToast('Failed to update settings.');
    });
  }

  resetLocation() {
    this.defaultLocation = this.settings.defaultLocation;
    this.building = this.location.buildings;
    const filteredBuilding = (this.building.filter(building => building.active === true))[0];
    this.selectedBuilding = filteredBuilding.name;
    this.defaultBuilding = filteredBuilding.id;
    // console.log(this.defaultLocation + ' ' + this.defaultBuilding);
  }


  update() {
    this.settings.trainersPerPage = this.trainersPerPage;
    this.settings.reportGrads = this.reportGrads;
    this.settings.batchLength = this.batchLength;
    this.settings.reportIncomingGrads = this.reportIncomingGrads;
    this.settings.minBatchSize = this.minBatchSize;
    this.settings.maxBatchSize = this.maxBatchSize;
    this.settings.trainerBreakDays = this.trainerBreakDays;
    this.settings.defaultBuilding = this.defaultBuilding;
    this.settings.defaultLocation = this.defaultLocation;
    // console.log(this.settings);
    this.saveSettings();
  }


  cancel() {
    this.trainersPerPage = this.settings.trainersPerPage;
    this.reportGrads = this.settings.reportGrads;
    this.batchLength = this.settings.batchLength;
    this.reportIncomingGrads = this.settings.reportIncomingGrads;
    this.minBatchSize = this.settings.minBatchSize;
    this.maxBatchSize = this.settings.maxBatchSize;
    this.trainerBreakDays = this.settings.trainerBreakDays;
    this.settings.defaultBuilding = this.defaultBuilding;
    this.settings.defaultLocation = this.defaultLocation;
  }
}
