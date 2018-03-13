import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TrainersComponent} from '../trainers/trainers.component';
import {Trainer} from '../domain/trainer';
import {PtoService} from '../services/pto.service';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.css']
})
export class PtoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
})
export class CalendarDialogComponent {

  constructor(private ptoService: PtoService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CalendarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    event.stopPropagation();
    this.dialogRef.close();
  }

  hideCalendar() {
    this.dialogRef.close();

  }

  showPTODialog() {
    this.dialogRef.close();
    const pto: any = {
      startDate: Date,
      endDate: Date,
    };
    const dialogRef = this.dialog.open(PtoDialogComponent, {
      width: '450px',
      data: {
        pto: pto
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          if (result.startDate === null || result.endDate === null || result.startDate === '' || result.endDate === '') {
            return;
          } else {
            this.ptoService.addPto(result, result.startDate, result.endDate);
            // this.dialogRef.close();
            this.dialog.open(CalendarDialogComponent);
          }
        }
      });
  }

}

@Component({
  selector: 'app-pto-dialog',
  templateUrl: './ptoRequestDialog.component.html',
})
export class PtoDialogComponent {

  constructor(public dialogRef: MatDialogRef<PtoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    event.stopPropagation();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}

