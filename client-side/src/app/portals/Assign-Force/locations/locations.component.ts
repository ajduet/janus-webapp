// ///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry} from '@angular/material';
import {Locations} from '../domain/locations';
import {Building} from '../domain/building';
import {Room} from '../domain/room';
import {LocationService} from '../services/location.service';
import {BuildingService} from '../services/building.service';
import {RoomService} from '../services/room.service';
import {NotificationService} from '../services/notification.service';
import {User} from '../domain/user';
import {UserInfoService} from '../services/user-info.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationsComponent implements OnInit {
  expanded: boolean[] = [];
  locations: Locations[] = [];
  userRole = 'VP of Technology';

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private locationService: LocationService,
              private buildingService: BuildingService,
              private roomService: RoomService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_location_city_black_48px.svg'));
    iconRegistry.addSvgIcon(
      'building',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg'));
    iconRegistry.addSvgIcon(
      'room',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg'));
  }
  ngOnInit() {
    this.getAllLocations();
    const user: User = this.userInfoService.getUser();
    this.userRole = user.role;
  }
  // error messages
  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }
  collapseAll(id: number) {
    this.expanded[id] = !this.expanded[id];

    for (let i = 0; i < this.expanded.length; i++) {
      if (i !== id) {
        this.expanded[i] = false;
      }
    }
  }
  /* ===================== Locations CRUD =======================*/
  getAllLocations() {
    this.locationService.getAll()
      .subscribe(locations => {
        this.locations = locations;
        this.expanded = [];
        for (const location of this.locations) {
          if (location.active) {
            this.expanded.push(false);
          }
        }
      }, err => {
     //   console.log(err);
        this.showToast('Failed to fetch locations');
      });
  }
  // getLocation(id: number) {
  //   this.locationService.getById(id)
  //     .subscribe();
  // }
  addLocation(location: Locations) {
    this.locationService.create(location)
      .subscribe(res => {
          console.log(res);
          this.getAllLocations();
        }, err => {
        console.log(err);
        this.showToast('Failed to add location');
      });
  }
  updateLocation(location: Locations) {
    this.locationService.update(location)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to update location');
      });
  }
  deleteLocation(location: Locations) {
    this.locationService.delete(location)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to delete location');
      });
  }
  /* ===================== Building CRUD =======================*/
  addBuilding(building: Building) {
    this.buildingService.create(building)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to add building');
      });
  }
  updateBuilding(building: Building) {
    this.buildingService.update(building)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to update building');
      });
  }
  deleteBuilding(building: Building) {
    this.buildingService.delete(building)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to delete building');
      });
  }
  /* ===================== Room CRUD =======================*/
  addRoom(room: Room) {
    this.roomService.create(room)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to add room');
      });
  }
  updateRoom(room: Room) {
    this.roomService.update(room)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to update room');
      });
  }
  deleteRoom(room: Room) {
    this.roomService.delete(room)
      .subscribe(res => {
        console.log(res);
        this.getAllLocations();
      }, err => {
        console.log(err);
        this.showToast('Failed to delete room');
      });
  }
  /* ===================== Dialog =======================*/
  openAddLocationDialog(evt): void {
    evt.stopPropagation();
    const location: Locations = {
      id: null,
      name: null,
      city: null,
      state: null,
      buildings: [],
      active: true
    };
    const dialogRef = this.dialog.open(LocationAddLocationDialogComponent, {
      width: '450px',
      data: {
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLocation(result);
      }
    });
  }
  openDeleteLocationDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteLocationDialogComponent, {
      width: '250px',
      data: {
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocation(result);
      }
    });
  }
  openEditLocationDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditLocationDialogComponent, {
      width: '450px',
      data: {
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLocation(result);
      }
    });
  }
  openAddBuildingDialog(evt, location: Locations): void {
    evt.stopPropagation();
    const building: Building = {
      id: null,
      name: null,
      rooms: [],
      active: true,
      location: location.id
    };
    const dialogRef = this.dialog.open(LocationAddBuildingDialogComponent, {
      width: '450px',
      data: {
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBuilding(result);
      }
    });
  }
  openDeleteBuildingDialog(evt, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteBuildingDialogComponent, {
      width: '250px',
      data: {
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBuilding(result);
      }
    });
  }
  openEditBuildingDialog(evt, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditBuildingDialogComponent, {
      width: '450px',
      data: {
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBuilding(result);
      }
    });
  }
  openAddRoomDialog(evt, building: Building): void {
    evt.stopPropagation();
    const room: Room = {
      roomID: null,
      roomName: null,
      building: building.id,
      active: true
    };
    const dialogRef = this.dialog.open(LocationAddRoomDialogComponent, {
      width: '450px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRoom(result);
      }
    });
  }
  openDeleteRoomDialog(evt, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteRoomDialogComponent, {
      width: '250px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoom(result);
      }
    });
  }
  openEditRoomDialog(evt, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditRoomDialogComponent, {
      width: '450px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateRoom(result);
      }
    });
  }
}

/* ===================== Dialog Components =======================*/

@Component({
  selector: 'app-location-add-location-dialog',
  templateUrl: './location-add-location-dialog.component.html',
})
export class LocationAddLocationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationAddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-delete-location-dialog',
  templateUrl: './location-delete-location-dialog.component.html',
})
export class LocationDeleteLocationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationDeleteLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-location-dialog',
  templateUrl: './location-edit-location-dialog.component.html',
})
export class LocationEditLocationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationEditLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-add-building-dialog',
  templateUrl: './location-add-building-dialog.component.html',
})
export class LocationAddBuildingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationAddBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-delete-building-dialog',
  templateUrl: './location-delete-building-dialog.component.html',
})
export class LocationDeleteBuildingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationDeleteBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-building-dialog',
  templateUrl: './location-edit-building-dialog.component.html',
})
export class LocationEditBuildingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationEditBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-add-room-dialog',
  templateUrl: './location-add-room-dialog.component.html',
})
export class LocationAddRoomDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationAddRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-delete-room-dialog',
  templateUrl: './location-delete-room-dialog.component.html',
})
export class LocationDeleteRoomDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationDeleteRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-room-dialog',
  templateUrl: './location-edit-room-dialog.component.html',
})
export class LocationEditRoomDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationEditRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
