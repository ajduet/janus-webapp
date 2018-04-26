import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddFocusComponent } from '../add-focus/add-focus.component';
import { EditFocusComponent } from '../edit-focus/edit-focus.component';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { Focus } from '../../model/Focus';

@Component({
  selector: 'app-foci',
  templateUrl: './foci.component.html',
  styleUrls: ['./foci.component.css']
})
export class FociComponent implements OnInit {
  focusData: Focus[] = [];

  constructor(private dialog: MatDialog, private focusControllerService: FocusControllerService) {}

  ngOnInit() {
    this.focusControllerService.findAll().subscribe(data => {
      this.focusData = data;
    });
  }

  openAddFocusDialog() {
    const dialogRef = this.dialog.open(AddFocusComponent, {});
  }

  openEditFocusDialog(focus) {
    const dialogRef = this.dialog.open(EditFocusComponent, {
      data: focus
    });
  }

  confirmRemoveFocus(focus) {
    if (confirm('Are you sure you want to remove ' + focus.name + '?')) {
      this.focusControllerService.remove(focus.id);
    }
  }
}
