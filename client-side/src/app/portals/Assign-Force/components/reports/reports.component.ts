import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

const Reports: Report[] = [
  {
    skill: '.NET',
    jan: 26,
    feb: 26,
    mar: 16,
    apr: 26,
    may: 0,
    jun: 8,
    jul: 5,
    aug: 15,
    sep: 20,
    oct: 5,
    nov: 8,
    dec: 16
  },
  {
    skill: 'Java',
    jan: 24,
    feb: 13,
    mar: 6,
    apr: 30,
    may: 10,
    jun: 13,
    jul: 20,
    aug: 21,
    sep: 29,
    oct: 7,
    nov: 13,
    dec: 17
  },
  {
    skill: 'Custom',
    jan: 26,
    feb: 5,
    mar: 11,
    apr: 0,
    may: 1,
    jun: 3,
    jul: 25,
    aug: 12,
    sep: 18,
    oct: 1,
    nov: 29,
    dec: 13
  },
  {
    skill: 'SDET',
    jan: 27,
    feb: 16,
    mar: 12,
    apr: 24,
    may: 2,
    jun: 27,
    jul: 19,
    aug: 0,
    sep: 19,
    oct: 19,
    nov: 28,
    dec: 23
  }
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['skill', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  dataSource = new MatTableDataSource(Reports);

  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface Report {
  skill: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}
