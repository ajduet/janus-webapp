import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatIconRegistry} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Angular2Csv} from 'angular2-csv';
import {BatchService} from '../services/batch.service';
import {CurriculaService} from '../services/curricula.service';
import {NotificationService} from '../services/notification.service';
import {Curriculum} from '../domain/curriculum';
import {Batch, BatchLocation} from '../domain/batch';
import {Trainer} from '../domain/trainer';
import {TrainerService} from '../services/trainer.service';
import {ReplogicService} from '../replogic.service';
import {Chart} from 'angular-highcharts';
import {SettingsService} from '../services/global-settings.service';
import {GlobalSettings} from '../domain/global-settings';
import {UserInfoService} from '../services/user-info.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  curricula: Curriculum[] = [];
  batch: Batch[] = [];
  trainer: Trainer[] = [];
  // remove = [];
  setting: GlobalSettings[] = [];
  reportGrads = 13;
  reportIncomingGrads = 18;

  fail = 0;
  success = 0;
  isAdmin = true;

  newBatch: any = {};
  defaultLocation: any = {};
  // for creating new projection
  cardArr = [];
  // use for getting the current date, and calculation of the hire date
  monthList = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  gradYear = new Date().getFullYear();
  incomeYear = new Date().getFullYear();
  hireDate = new Date();
  startDate = new Date();
  // Use to calculate the total number in the card array
  // totalBatch: any = {};
  // batchType = [];
  totalNetBatch = 0;
  totalSDETBatch = 0;
  totalJavaBatch = 0;
  totalSalesforceBatch = 0;
  totalBigDataBatch = 0;
  totalCumulativeBatch = 0;
  // for table


  errMsg = '';

  // for curriculum selection
  curriculaControl = new FormControl('', [Validators.required]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public skills: ReplogicService, private ref: ChangeDetectorRef, private settingService: SettingsService,
              private batchService: BatchService, private curriculaService: CurriculaService, private userInfoService: UserInfoService,
              private trainerService: TrainerService, private notificationService: NotificationService,
              private mat: MatIconRegistry, private dom: DomSanitizer) {
                mat.addSvgIcon('add', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_add_circle_outline_white_24px.svg'));
                mat.addSvgIcon('settings', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_settings_white_24px.svg'));
                mat.addSvgIcon('cancel', dom.bypassSecurityTrustResourceUrl('../../../assets/img/letter-x.svg'));
                mat.addSvgIcon('export', dom.bypassSecurityTrustResourceUrl('../../../assets/img/export.svg'));
    this.getAllCurriculum();
    this.getAllBatches();
    this.getAllTrainer();
    // this.getDefaultSetting();
    this.skills.getList();
    this.skills.getTrainerList();
  }

  displayedColumns = ['Ciriculam', 'jan', 'febuaray', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'];
  dataSource = new MatTableDataSource(this.skills.getElement());
  dataSource1 = new MatTableDataSource(this.skills.getTrainerElement());


  chart = new Chart({
      chart: {
        type: 'column',
        renderTo: 'chartcontainer',
        backgroundColor: 'charcoal',
      },
      title: {
        text: 'Graduate Summary'
      }
      ,
      credits: {
        enabled: false
      },

      yAxis: {
        min: 0,
        max: 160,

        title: {
          text: 'Skills',
        }
      },
      xAxis: {
        crosshair: true,
        categories: [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' ,
          'August' , 'September' , 'October' , 'November', 'December']

      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ' +
        '<b>\'<td style="text-align-: right"><b><span style="color: whitesmoke">{point.y}</b> <br/>',
        backgroundColor: 'black',
        borderWidth: 5,
        borderColor: 'purple',
        shared: true,


      },
      plotOptions: {
        column : {
          stacking : 'perce',
          pointWidth: 9,
          pointPadding: 0.2,

        }},
      series: this.skills.getList()
      ,
    }
  );
  Trainer = new Chart({
      chart: {
        type: 'column',
        renderTo: 'TrainerContainer',
        backgroundColor: 'charcoal',
      },
      title: {
        text: 'Incoming Batches of 2018'
      },
      credits: {
        enabled: false
      },

      yAxis: {
        min: 0,
        max: 160,

        title: {
          text: 'Skills',
        }
      },
      xAxis: {
        crosshair: true,
        categories: [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' ,
          'August' , 'September' , 'October' , 'November', 'December']

      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ' + '' + '' +
        '<b>\'<td style="text-align-: right"><b><span style="color: whitesmoke">{point.y}</b> <br/>',
        backgroundColor: 'black',
        borderWidth: 5,
        borderColor: 'purple',
        shared: true,
      },
      plotOptions: {
        column : {
          stacking : 'perce',
          pointWidth: 9,
          pointPadding: 0.2,
        }},
      series: this.skills.getTrainerList(),
    }
  );


  ngOnInit() {

    this.isAdmin = false;
    if (this.userInfoService.getUser().role === 'VP of Technology') {
      this.isAdmin = true;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.skills.getElement();
    this.skills.getTrainerList();
    this.skills.getList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }
  // error message
  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }
  // get default setting
  getDefaultSetting() {
    this.settingService.getSettings().subscribe(
      setting => {
        this.setting = setting;
        this.reportIncomingGrads = this.setting[0].reportIncomingGrads;
        this.reportGrads = this.setting[0].reportGrads;
        console.log(this.setting);
      }, err => {
        console.log(err);
        this.showToast('Failed to fetch Setting');
      }
    );
  }
  /*getDefaultSetting() {
    this.settingService.getSettings()(
        this.setting = setting;
        this.reportIncomingGrads = this.setting[0].reportIncomingGrads;
        this.reportGrads = this.setting[0].reportGrads;
        console.log(this.setting);

    );
  }*/
  // get all batches
  getAllBatches() {
    this.batchService.getAll().subscribe(batch => {
      this.batch = batch;
      for (const x of Object.keys(this.batch)) {
        this.batch[x].startDate = new Date(this.batch[x].startDate);
        this.batch[x].endDate = new Date(this.batch[x].endDate);
      }
      // console.log(new Date(this.batch[0].startDate));

    }, err => {
      console.log(err);
      this.showToast('Failed to fetch batch');
      });
  }
  // get all curriculum
  getAllCurriculum() {
    this.curriculaService.getAll().subscribe(curricula => {
      this.curricula = curricula;
      // for (const x of Object.keys(this.curricula)) {
      //
      // }
      console.log(this.curricula);
    }, err => {
      console.log(err);
      this.showToast('Failed to fetch curricula');
      });
  }
  // get all trainer
  getAllTrainer() {
    this.trainerService.getAll().subscribe(trainer => {
      this.trainer = trainer;
      console.log(this.trainer);
    }, err => {
      console.log(err);
      this.showToast('Failed to fetch trainer');
    });
  }
  genCard(evt) {
    evt.stopPropagation();
    const temp: any = {};
    temp.requiredGrads = 13;
    temp.requiredBatches = 1;
    temp.hireDate = this.hireDate;
    // temp.startDate = new Date();
    // temp.requiredGrads = this.rc.requiredGrads;
    // temp.hireDate = new Date();
    // temp.requiredBatches = this.rc.requiredBatches;
    // temp.startDate = this.rc.startDate;
    // temp.formattedStartDate = this.rc.formattedStartDate;
    // temp.batchType = this.batch;
    this.cardArr.push(temp);
    console.log(this.cardArr);
  }
  // Remove a card from the array index
  removeCard(index) {
    this.cardArr.splice(index, 1);
    this.cumulativeBatches();
  }
  exportToCSV(evt, name) {
    evt.stopPropagation();
    const errorbye = new Angular2Csv(this.skills.getElement(), name);
  }
  openMenu(evt) {
    evt.stopPropagation();
  }
  /* FUNCTION - This method will compute the required batch start date, given a required hire date */
  calcStartDate(requiredDate, index, evt) {
    const tempDate = new Date(requiredDate);
    const startDate = (requiredDate === undefined) ? (new Date()) : tempDate;
    console.log(startDate);
    // startDate.setDate(startDate.getDate() - (7 * this.setting[0].batchLength));
    startDate.setDate(startDate.getDate() - (7 * 11));
    // push the start date to the closest Monday
    switch (startDate.getDay()) {
      case 0 :
        startDate.setDate(startDate.getDate() + 1);
        break;
      case 1 :
        startDate.setDate(startDate.getDate() + 0);
        break;
      case 2 :
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 3 :
        startDate.setDate(startDate.getDate() - 2);
        break;
      case 4 :
        startDate.setDate(startDate.getDate() - 3);
        break;
      case 5 :
        startDate.setDate(startDate.getDate() - 4);
        break;
      case 6 :
        startDate.setDate(startDate.getDate() - 5);
        break;
      default:
        break;
    }
    // format date to 'mm-dd-yyyy' and assign the output for easier user visibility and comprehension
    const wkDayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const formattedDate = this.monthList[startDate.getMonth()] + '-' + startDate.getDate() + '-' + startDate.getFullYear()
      + '(' + wkDayArr[startDate.getDay()] + ')';
    // assigns tempDate to the objects 'hireDate'
    // console.log(tempDate);
    // console.log(this.cardArr[index].hireDate);
    // this.cardArr[index].hireDate = tempDate;
    // this value is used when creating specific batches from the card panel
    this.cardArr[index].startDate = startDate;
    // set the 'startdate' within 'cardArr' at the index value to be the formatted date
    this.cardArr[index].formattedStartDate = formattedDate;
  }
  /* FUNCTION - This method will compute the number of batches needed to be made, given the number of required Trainee's. */
  calcReqBatch(requiredTrainees, index) {
    // compute the total number of Batches estimated
    const neededBatches = Math.ceil(requiredTrainees / 15);

    // calculate the 'requiredBatches' data value in the card array
    this.cardArr[index].requiredBatches = neededBatches;
    // calculate the total number of desired batches
    this.cumulativeBatches();
  }
  /* FUNCTION - This method will assign the particular card objects 'batchType' variable to the selected value. */
  assignCurr(batchType, index) {
    this.cardArr[index].batchType = batchType;
    if (this.cardArr[index].requiredBatches > 0) {
      this.cumulativeBatches();
    }
  }
  /* FUNCTION - This method will generate the sum of all batch types held within the 'cardArr' variable,
  ultimately displaying them in the 'master card' on the reports tab. */
  cumulativeBatches() {
    this.totalJavaBatch = 0;
    this.totalNetBatch = 0;
    this.totalSDETBatch = 0;
    this.totalSalesforceBatch = 0;
    this.totalBigDataBatch = 0;
    this.totalCumulativeBatch = 0;
    for (const x in this.cardArr) {
      if ((this.cardArr[x].batchType)) {
        const batchVal = this.cardArr[x].batchType.currId;
        console.log(batchVal);
        switch (batchVal) {
          // switch case for JAVA batches
          case 1 :
            this.totalJavaBatch += this.cardArr[x].requiredBatches;
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          // switch case for .Net batches
          case 2 :
            this.totalNetBatch += this.cardArr[x].requiredBatches;
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          // switch case for SDET batches
          case 3 :
            this.totalSDETBatch += this.cardArr[x].requiredBatches;
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          // switch case for Salesforce batches
          case 150 :
            this.totalSalesforceBatch += this.cardArr[x].requiredBatches;
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          // switch case for BigData batches
          case 164 :
            this.totalBigDataBatch += this.cardArr[x].requiredBatches;
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          // switch case for Custom batches
          case 105 :
            this.totalCumulativeBatch += this.cardArr[x].requiredBatches;
            break;
          default :
            break;
        }
      }
    }
    console.log(this.totalCumulativeBatch);
  }

  // cumulativeBatchesF() {
  //   this.totalCumulativeBatch = 0;
  //   for (const x in this.cardArr) {
  //     if ((this.cardArr[x].batchType)) {
  //       const batchVal = this.cardArr[x].batchType.currId;
  //       console.log(batchVal);
  //       console.log(this.batchType);
  //       for (const y in this.batchType) {
  //         if (this.batchType[y] === this.cardArr[x].batchType.currId) {
  //         }
  //       };
  //     }
  //   }
  //   console.log(this.totalCumulativeBatch);
  // }
  /* FUNCTION - This method will assert that batches have valid credentials for submission */
  submissionValidityAssertion(batch) {
    const flagArr = [0, 0, 0];
    let count = 0;
    let canSubmit = 0;
    const today = new Date();
    console.log(batch.startDate);
    console.log(today);
    if (batch.startDate <= today || batch.startDate === undefined) {
      this.errMsg = 'Invalid Hire Date';
      flagArr[1] = 1;
      canSubmit = 1;
    }
    if (batch.requiredGrads === null) {
      this.errMsg = 'Requires Trainee\'s';
      flagArr[0] = 1;
      canSubmit = 1;
    }
    if (batch.hireDate === '') {
      this.errMsg = 'Request Hire Date.';
      flagArr[1] = 1;
      canSubmit = 1;
    }
    if (batch.batchType === undefined) {
      this.errMsg = 'Invalid Batch Type.';
      flagArr[2] = 1;
      canSubmit = 1;
    }
    // Check if multiple input are missing
    for (const x in flagArr) {
      if (flagArr[x] === 1) {
        count = count + 1;
        if (count > 1) {
          this.errMsg = 'Multiple Input Requires';
        }
      }
    }
    return canSubmit;
  }
  /* FUNCTION - This method will generate a new 'card' in the cardArr object, which will be displayed to the user on the reports tab. */
  createBatch(batch, index, multiple) {
    const canSubmit = this.submissionValidityAssertion(batch);
    // let newBatch: Batch;
    if (canSubmit === 1) {
      this.showToast(this.errMsg);
      if (multiple) {
        this.fail += 1;
      }
    } else if (canSubmit === 0) {     // Create batch with batchService
      this.defaultLocation.buildingId = this.setting[0].defaultBuilding;
      this.defaultLocation.locationId = this.setting[0].defaultLocation;
      // this.defaultLocation.buildingId = 1;
      // this.defaultLocation.locationId = 1;
      this.newBatch.name = '-';
      this.newBatch.startDate = batch.startDate;
      this.newBatch.endDate = batch.hireDate;
      this.newBatch.trainer = '1';
      this.newBatch.cotrainer = '1';
      this.newBatch.curriculum = batch.batchType.currId;
      this.newBatch.batchLocation = this.defaultLocation;
      this.newBatch.batchStatus = {};
      console.log(this.newBatch);
      for (let i = 0; i  < batch.requiredBatches; i++) {
        this.batchService.create(this.newBatch).subscribe(
          data => {
            console.log('batch created sucessfully');
            this.showToast('batch created sucessfully');
            index = this.cardArr.indexOf(batch);
            console.log(i);
            if (i === 1) {
              console.log('loading');
              this.removeCard(index);
            }
            if (multiple) {
              this.success += 1;
            }
          },
          error => console.log('error creating batch')
        );
      }
    }
  }
  createAllBatch() {
    const tempCardArr = this.cardArr;
    for (const x of Object.keys(tempCardArr)) {
      this.createBatch(tempCardArr[x], x, true);
    }
    setTimeout(() => {
      if (this.cardArr.length !== 0) {
        this.showToast('Successfully creating ' + this.success + ' batches. Error creating ' + this.fail + ' batches');
      } else {
        this.showToast('Successfully creating all batch');
      }
      this.success = 0;
      this.fail = 0;
      }, 1000);
  }
}

