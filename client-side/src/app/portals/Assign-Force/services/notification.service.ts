import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  /** Opens a new snackbar object */
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
