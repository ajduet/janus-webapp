import { Component, OnInit } from '@angular/core';

import { Building } from '../../model/Building';
import { Address } from '../../model/Address';
import { Setting } from '../../model/Setting';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingService: SettingControllerService,
    private addressService: AddressControllerService,
    private buildingService: BuildingControllerService
  ) {}

  setting: Setting = new Setting(0, '', 0, 0, 0, 0, 0, 0, 0, null, null, '');

  defaultLocation: Address;
  defaultBuilding: Building;

  locations: Address[];
  buildings: Building[];

  isLoading = false;
  isError = false;

  ngOnInit() {
    this.isError = false;
    this.loadLocations();
    this.loadBuildings();
    this.getSettingsInfo();
  }

  private loadLocations() {
    this.addressService
      .findAll()
      .toPromise()
      .then(locations => {
        this.locations = locations;
      })
      .catch(err => {
        console.log(err);
      });
  }

  private loadBuildings() {
    this.buildingService
      .findAll()
      .toPromise()
      .then(buildings => {
        this.buildings = buildings;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // grabs settings information
  getSettingsInfo() {
    console.log('loading setting data from service...');
    this.isLoading = true;
    this.settingService
      .find(1)
      .toPromise()
      .then(setting => {
        console.log('retrieved setting data!');
        console.log(setting);

        this.setting = setting;
        this.defaultBuilding = setting.defaultBuilding;
        this.defaultLocation = setting.defaultLocation;

        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        this.isError = true;
        console.log('error retrieving setting data.');
        console.log(err);
      });
  }

  // saves the settings information
  save() {
    console.log('saving settings...');
    this.isLoading = true;
    this.settingService
      .update(this.setting)
      .toPromise()
      .then(setting => {
        console.log('save success');
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // resets the settings information
  reset(evt) {
    console.log('resetting settings');
    this.isError = false;
    this.getSettingsInfo();
    evt.preventDefault();
  }
}
