import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { Focus } from '../../model/Focus';

@Component({
  selector: 'app-add-focus',
  templateUrl: './add-focus.component.html',
  styleUrls: ['./add-focus.component.css']
})
export class AddFocusComponent implements OnInit {
  focus: Focus;

  constructor(
    public dialogRef: MatDialogRef<AddFocusComponent>,
    private focusControllerService: FocusControllerService,
    private skillControllerService: SkillControllerService
  ) {}

  skills: Skill[] = [];

  selectedSkills: Skill[];

  ngOnInit() {
    this.newFocus();
    this.skillControllerService.findAll().subscribe(data => {
      this.skills = data;
    });
  }

  closeDialog(): void {
    console.log(this.selectedSkills);
    this.dialogRef.close();
  }

  newFocus(): void {
    this.focus = new Focus(0, '', false, []);
  }

  addFocus(): void {
    console.log('We are Adding a focus ' + this.focus.name);
    this.focusControllerService.create(this.focus);
    this.newFocus();
    this.closeDialog();
  }
}
