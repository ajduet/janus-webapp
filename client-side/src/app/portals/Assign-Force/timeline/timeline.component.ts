import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'highcharts/adapters/standalone-framework.src';
import * as xRange from 'highcharts/modules/xrange.js';
import { BatchService } from '../services/batch.service';
import { Batch } from '../domain/batch';
import { TrainerService } from './../services/trainer.service';
import { Trainer } from './../domain/trainer';
import { CurriculaService } from './../services/curricula.service';
import { Curriculum } from './../domain/curriculum';
import { LocationService } from './../services/location.service';
import { Locations } from './../domain/locations';
import { BuildingService } from './../services/building.service';
import { Building } from './../domain/building';

const Highcharts = require('highcharts/highcharts.src');

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements AfterViewInit, OnInit {
  curriculum = new FormControl();
  focus = new FormControl();
  location = new FormControl();
  bulding = new FormControl();
  curriculumList = [];
  focusList = [];
  locationList = [];
  buldingList = [];
  nameList = [];
  isConcluded = false;
  batches: Batch[];
  filteredBatches: Batch[];
  curriculums: Curriculum[];
  locations: Locations[];
  buldings: Building[];
  curriculumslist: string;
  locationlist: string;
  buildinglist: string;
  trainerName: string;
  trainer: Trainer;
  startDate = new Date();
  endDate = new Date();

  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  private chart: any;

  constructor(
    private batchService: BatchService,
    private trainerService: TrainerService,
    private curriculumService: CurriculaService,
    private locationService: LocationService,
    private buildingService: BuildingService
  ) { }

  ngOnInit() {
    this.setCurriculumList();
    this.setLocationList();
    this.setBuildingList();
    this.setFocusList();
  }

  ngAfterViewInit() {

    xRange(Highcharts);

    this.chart = Highcharts.chart(this.container.nativeElement, {
      chart: {
        type: 'xrange'
      },
      title: {
        text: 'Batches'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%b.\%e \'%y', this.value);
          }
        }
      },
      yAxis: {
        title: {
          text: 'Trainers'
        },
        categories: [],
        reversed: true
      },
      series: []
    });
    this.getAllBatches();
  }

  getAllBatches() {
    let yAxisPosition = 0; // Sets the Y-axis
    this.batchService.getAll().subscribe(batchData => {
      this.batches = batchData;
      for (const entry of this.batches) {
        this.trainerService.getById(entry.trainer).subscribe(trainerData => {
          this.trainer = trainerData;
          this.trainerName = (this.trainer.firstName + ' ' + this.trainer.lastName);
          this.nameList.push(this.trainerName);
          console.log(this.nameList);
          this.chart.yAxis[0].update({
            categories: this.nameList
          });
        });
        this.chart.addSeries(
          {
            name: entry.name,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
              x: entry.startDate,
              x2: entry.endDate,
              y: yAxisPosition,
            }]
          });
        yAxisPosition++;
      }
    });
  }

  updateTimeline() {
    console.log('UPDATEING TIMELINE');
    this.chart.xAxis[0].update({
      min: this.startDate.getTime(),
      max: this.endDate.getTime()
    });
  }

  // Concluded batches checkbox
  hide() {
    this.isConcluded = !this.isConcluded;
    console.log(this.isConcluded);
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(true);
    }
    if (this.isConcluded) {
      console.log(this.batches);
      this.filteredBatches = this.batches.filter(
        batch => batch.endDate > new Date()
      );
      let yAxiPosition = 0;
      for (const entry of this.filteredBatches) {
        this.trainerService.getById(entry.trainer).subscribe(trainerData => {
          this.trainer = trainerData;
          this.trainerName = (this.trainer.firstName + ' ' + this.trainer.lastName);
          this.nameList.push(this.trainerName);
          console.log(this.nameList);
          this.chart.yAxis[0].update({
            categories: this.nameList
          });
        });
        this.chart.addSeries(
          {
            name: entry.name,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
              x: entry.startDate,
              x2: entry.endDate,
              y: yAxiPosition,
            }]
          });
        yAxiPosition++;
      }
    } else {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }
      let yAxiPosition = 0;
      for (const entry of this.filteredBatches) {
        this.trainerService.getById(entry.trainer).subscribe(trainerData => {
          this.trainer = trainerData;
          this.trainerName = (this.trainer.firstName + ' ' + this.trainer.lastName);
          this.nameList.push(this.trainerName);
          console.log(this.nameList);
          this.chart.yAxis[0].update({
            categories: this.nameList
          });
        });
        this.chart.addSeries(
          {
            name: entry.name,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
              x: entry.startDate,
              x2: entry.endDate,
              y: yAxiPosition,
            }]
          });
        yAxiPosition++;
      }
    }
  }

  hideBatchlessTrainers() {
    this.isConcluded = !this.isConcluded;
    console.log(this.isConcluded);
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(true);
    }
    if (this.isConcluded) {
      console.log(this.batches);
      this.filteredBatches = this.batches.filter(
        batch => batch.trainer
      );
      let yAxiPosition = 0;
      for (const entry of this.filteredBatches) {
        this.trainerService.getById(entry.trainer).subscribe(trainerData => {
          this.trainer = trainerData;
          this.trainerName = (this.trainer.firstName + ' ' + this.trainer.lastName);
          this.nameList.push(this.trainerName);
          console.log(this.nameList);
          this.chart.yAxis[0].update({
            categories: this.nameList
          });
        });
        this.chart.addSeries(
          {
            name: entry.name,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
              x: entry.startDate,
              x2: entry.endDate,
              y: yAxiPosition,
            }]
          });
        yAxiPosition++;
      }
    } else {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }
      let yAxiPosition = 0;
      for (const entry of this.filteredBatches) {
        this.trainerService.getById(entry.trainer).subscribe(trainerData => {
          this.trainer = trainerData;
          this.trainerName = (this.trainer.firstName + ' ' + this.trainer.lastName);
          this.nameList.push(this.trainerName);
          console.log(this.nameList);
          this.chart.yAxis[0].update({
            categories: this.nameList
          });
        });
        this.chart.addSeries(
          {
            name: entry.name,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
              x: entry.startDate,
              x2: entry.endDate,
              y: yAxiPosition,
            }]
          });
        yAxiPosition++;
      }
    }
  }

  setRandomDate() {
    // this.startDate = new Date(+this.startDate + Math.random() * (this.endDate.getHours() - this.startDate.getHours()))
    // this.endDate = new Date(+this.startDate + Math.random() * (this.endDate.getHours() - this.startDate.getHours()))
    this.isConcluded = !this.isConcluded;
    this.chart.xAxis[0].update({
      min: new Date().getTime(),
    });
  }

  setFocusList() {
    this.curriculumService.getAll().subscribe(curriculumData => {
      this.curriculums = curriculumData;
      for (const entry of this.curriculums) {
        if (entry.core) {
          this.curriculumslist = entry.name;
          this.focusList.push(this.curriculumslist);
        }
      }
    });
  }

  setCurriculumList() {
    this.curriculumService.getAll().subscribe(curriculumData => {
      this.curriculums = curriculumData;
      for (const entry of this.curriculums) {
        this.curriculumslist = entry.name;
        this.curriculumList.push(this.curriculumslist);
      }
    });
  }

  setLocationList() {
    this.locationService.getAll().subscribe(locationData => {
      this.locations = locationData;
      for (const entry of this.locations) {
        this.locationlist = entry.name;
        this.locationList.push(this.locationlist);
      }
    });
  }

  setBuildingList() {
    this.buildingService.getAll().subscribe(buildingData => {
      this.buldings = buildingData;
      for (const entry of this.buldings) {
        this.buildinglist = entry.name;
        this.buldingList.push(this.buildinglist);
      }
    });
  }
}
