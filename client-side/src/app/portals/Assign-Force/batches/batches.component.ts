import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Batch, BatchLocation, BatchStatus} from '../domain/batch';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatDialog} from '@angular/material';
import {BatchService} from '../services/batch.service';
import {NotificationService} from '../services/notification.service';
import {CurriculaService} from '../services/curricula.service';
import {TrainerService} from '../services/trainer.service';
import {DatePipe} from '@angular/common';
import {Curriculum} from '../domain/curriculum';
import {Trainer} from '../domain/trainer';
import {SkillService} from '../services/skill.service';
import {Skill} from '../domain/skill';
import {BuildingService} from '../services/building.service';
import {LocationService} from '../services/location.service';
import {RoomService} from '../services/room.service';
import {Building} from '../domain/building';
import {Room} from '../domain/room';
import {Locations} from '../domain/locations';
import {UserInfoService} from '../services/user-info.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BatchesComponent implements OnInit, AfterViewInit {
  curDate: any;
  minStartDate = new Date();
 minEndDate = new Date();
  datebetween: any;
  isManager = false;
  // This boolean changes the buttons in the first tab between cancel/finalize and create
  // true = create
  // false = cancel/finalize
  creating = true;

  // This is the batch that is being created or edited
  batch: Batch;
   monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  curriculumForm: Curriculum[];

  skills = new FormControl();

  skillForm: Skill[];

  trainerForm: Trainer[];

  locationForm: Locations[];

  buildingForm: Building[];
  roomForm: Room[];

  // This boolean checks if it is editing
  isEditing = false;

  // This is the id of the batch beign edited
  editBatchId = null;

  // This is the dialog box for the finalize button;
  finalize = 'finalize creation';

  firstTabHeader = 'Create New Batch';

  //  VALUES FOR THE ALL BATCHES TAB
  // These are the column names for the mat table to make it work
  // Make sure they are the same variable name as the values in the batch.ts
  batchValues = ['Checkbox', 'name', 'curriculumName', 'focusName', 'trainerName',
    'location', 'building', 'room', 'startDate', 'endDate', 'Icons'];

  // Batch data pulled from the database
  BatchData: Batch[];
  batchData = new MatTableDataSource(this.BatchData);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private batchService: BatchService,
              private curriculaService: CurriculaService,
              private trainerService: TrainerService,
              private skillService: SkillService,
              private locationService: LocationService,
              private buildingService: BuildingService,
              private roomService: RoomService,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private mat: MatIconRegistry, private dom: DomSanitizer) {
                mat.addSvgIcon('add', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_add_circle_outline_white_24px.svg'));
                mat.addSvgIcon('complete', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_done_white_24px.svg'));
                mat.addSvgIcon('cancel', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_cancel_white_24px.svg'));
                mat.addSvgIcon('edit', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_edit_white_24px.svg'));
                mat.addSvgIcon('copy', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_content_copy_white_24px.svg'));
              }

  ngOnInit() {
    this.getAll();
    this.setEndDate();
    this.initBatch();
  }

  ngAfterViewInit() {
    this.batchData.sort = this.sort;
    this.batchData.paginator = this.paginator;
    this.batchData = new MatTableDataSource(this.BatchData);
  }
  evalTrainer( skills ) {
   const res = skills.filter( function(n) { return !this.has(n); }, new Set(this.batch.skills) );
   return Math.round((res.length / this.batch.skills.length) * 10) + '%';
  }

  EditBatch(id: number) {
    this.firstTabHeader = 'Editing Batch';
    this.CloneBatch(id);
    this.creating = false;
    this.isEditing = true;
    this.finalize = 'finalize edit';
    this.editBatchId = id;
  }

  CloneBatch(id: number) {
    this.batchService.getById(id).subscribe(data => {
      console.log(data);
      this.initBatch();
      this.batch = data;
      this.batch.startDate = new Date(data.startDate);
      this.batch.endDate = new Date(data.endDate);
      this.datebetween = Math.round(((this.batch.endDate)as any - ((this.batch.startDate)as any)) / 1000 / 60 / 60 / 24 / 7);
      this.getBuildings();
      this.getRooms();
    });
  }

  DeleteBatch(id: number, evt) {
    const dialogRef = this.dialog.open(BatchDeleteDialogComponent,
      {
        width: '400px',
        data: id
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete batch dialog closed');
      this.reload(evt);
    });
  }

  SynchronizeBatch() {
  }
  // get user priviledge and return true if admin , else return false. Result determines if batch creation is available.
  isAuthorized() {
    if (this.userInfoService.getUser().role === 'VP of Technology') {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
    return this.isManager;
  }
  isCreating() {
    return this.creating;
  }

  // This opens up the two buttons that say cancel and finalize
  beginCreation(evt) {
    this.firstTabHeader = 'Create New Batch';
    this.creating = !this.creating;
    this.showToast('Creating New Batch');
    evt.stopPropagation();
  }

  // cancels a creation
  cancel(evt) {
    this.firstTabHeader = 'Create New Batch';
    this.creating = !this.creating;
    evt.stopPropagation();
    this.isEditing = false;
    this.finalize = 'finalize creation';
    this.editBatchId = null;
    this.batch.id = this.editBatchId;
    this.initBatch();
  }

  // finalzies creation
  create(evt) {
    // createBatch(). send form with data to micro service for batch creation.
    this.creating = !this.creating;
    console.log(this.batch);
    if (this.isEditing === false) {
      this.batchService.create(this.batch).subscribe(data => {
        this.getAll();
        this.editBatchId = null;
        this.batch.id = this.editBatchId;
        this.reload(evt);
      });
      console.log('create');
    } else {
      this.batchService.update(this.batch).subscribe(data => {
        this.reload(evt);
        console.log(this.batch);
        console.log('edit');
      });
    }
    this.cancel(evt);
    evt.stopPropagation();
  }

  reload(evt) {
    this.getAll();
    this.cancel(evt);
  }

  calcDate(evt) {
    this.curDate = new Date();
    this.datebetween = Math.round(((this.batch.endDate)as any - ((this.batch.startDate)as any)) / 1000 / 60 / 60 / 24 / 7);
    this.batch.name = this.curDate.getYear() % 100 + '' + (this.batch.startDate.getMonth() + 1) + ' ' + this.monthNames
      [this.batch.startDate.getMonth()] + '' + (this.batch.startDate.getUTCDate()) + '' + this.batch.curriculumName;
  }
  setCurName () {
    this.curriculaService.getById(this.batch.curriculum).subscribe(data => {
      this.batch.curriculumName = data.name;
    }, err => {
      console.log('Failed to fetch curriculum name.');
    } );
  }
  initBatch() {
    this.batch = {
      name: '' ,
      startDate: new Date(),
      endDate: this.minEndDate,
      curriculum: 1,
      focus: 1,
      trainer: null,
      cotrainer: null,
      batchStatus: {
        batchStatusID: 1,
        batchStatusName: 'Scheduled'
      },
      batchLocation: {
        buildingId: null,
        buildingName: null,
        roomId: null,
        roomName: null,
        locationId: null,
        locationName: null
      },
      skills: [],
      id: null,
      // Data that is not in the backend
      progress: 1,
      curriculumName: '',
      focusName: '',
      trainerName: '',
      cotrainerName: ''
    };
  }

  // error messages
  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }

  // Gets all batches and stores them in variable batchData
  // Should also get all trainers and curricula and store them
  getAll() {
    this.batchService.getAll().subscribe(data => {
      this.BatchData = data;
      for (const entry of this.BatchData) {/*
        this.curriculaService.getById(entry.curriculum)
          .subscribe(curriculumData => {
            entry.curriculumName = curriculumData.name;
          }, error => {
            this.showToast('Failed to fetch Curricula');
          });*/
        /*this.curriculaService.getById(entry.focus)
          .subscribe(focusData => {
            entry.focusName = focusData.name;
          }, error => {
            this.showToast('Failed to fetch Curricula');
          });*/
        this.trainerService.getById(entry.trainer)
          .subscribe(trainerData => {
            entry.trainerName = trainerData.firstName + ' ' + trainerData.lastName;
          }, error => {
            this.showToast('Failed to fetch trainers');
          });
        this.trainerService.getById(entry.cotrainer)
          .subscribe(cotrainerData => {
            entry.cotrainerName = cotrainerData.firstName + ' ' + cotrainerData.lastName;
          }, error => {
            this.showToast('Failed to fetch trainers');
          });

        this.locationService.getById(entry.batchLocation.locationId)
          .subscribe(locationData => {
            entry.batchLocation.locationId = locationData.id;
            entry.batchLocation.locationName = locationData.name;
          }, error => {
            this.showToast('Failed to fetch locations');
          });

        this.buildingService.getById(entry.batchLocation.buildingId)
          .subscribe(buildingData => {
            entry.batchLocation.buildingId = buildingData.id;
            entry.batchLocation.buildingName = buildingData.name;
          }, error => {
            this.showToast('Failed to fetch buildings');
          });

        this.roomService.getById(entry.batchLocation.roomId)
          .subscribe(roomData => {
            entry.batchLocation.roomId = roomData.roomID;
            entry.batchLocation.roomName = roomData.roomName;
          }, error => {
            this.showToast('Failed to fetch rooms');
          });
      }
      this.trainerService.getAll().subscribe(trainerData => {
        this.trainerForm = trainerData;
      }, error => {
        this.showToast('Failed to fetch trainers');
      });

      this.curriculaService.getAll().subscribe(curriculaData => {
        this.curriculumForm = curriculaData;
        for (const batch of this.BatchData){
          for (const curricula of curriculaData){
            if (batch.focus === curricula.currId) {
              batch.focusName = curricula.name;
            }
            if (batch.curriculum === curricula.currId) {
              batch.curriculumName = curricula.name;
            }
          }
        }
      }, error => {
        this.showToast('Failed to fetch curricula');
      });

      this.skillService.getAll().subscribe(skillData => {
        this.skillForm = skillData;
      }, error => {
        this.showToast('Failed to fetch skill');
      });

      this.locationService.getAll().subscribe(locationData => {
        this.locationForm = locationData;
      }, error => {
        this.showToast('Failed to fetch locations');
      });
      this.batchData = new MatTableDataSource(this.BatchData);
      this.batchData.sort = this.sort;
      this.batchData.paginator = this.paginator;
  }, error => {
      this.showToast('Failed to fetch batches');
    });
  }

  // Gets the buildings of the clicked room
  getBuildings() {
    this.locationService.getById(this.batch.batchLocation.locationId).subscribe(buildingData => {
      this.buildingForm = buildingData.buildings;
    }, error => {
      this.showToast('Failed to fetch buildings');
    });
  }
  // Gets the rooms of the clicked buildings
  getRooms() {
    this.buildingService.getById(this.batch.batchLocation.buildingId).subscribe(roomData => {
      this.roomForm = roomData.rooms;
    }, error => {
      this.showToast('Failed to fetch rooms');
    });
  }
  getCurriculumSkills () {
    this.curriculaService.getById(this.batch.curriculum).subscribe(data => {
      this.batch.skills = data.skills;
    });
  }
  getFocusSkills() {
    this.curriculaService.getById(this.batch.focus).subscribe(data => {
      console.log(data);
      this.batch.skills = this.batch.skills.concat(data.skills);
      console.log(this.batch.skills);
      this.setCurName();
    });
  }

  // used to remove dates from datepicker,
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Friday, Saturday and Sunday from being selected for batch start date..
    return day !== 0 && day !== 6 && day !== 5;
  }

  setEndDate() {
    this.minEndDate.setDate(this.minStartDate.getDate() + 70);
  }
}



/*************************   Batch Delete Dialog **********************************/
@Component({
  selector: 'app-batch-delete-dialog',
  templateUrl: 'batch-delete-dialog.component.html',
  styleUrls: ['./batches.component.css']
})

export class BatchDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BatchDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private batchService: BatchService
  ) {}

  deleteBatch() {
    console.log(this.data);
    this.batchService.delete(this.data).subscribe(batchDeleteData => {
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

