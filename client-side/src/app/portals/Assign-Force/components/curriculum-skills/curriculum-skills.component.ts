import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';

@Component({
  selector: 'app-curriculum-skills',
  templateUrl: './curriculum-skills.component.html',
  styleUrls: ['./curriculum-skills.component.css']
})
export class CurriculumSkillsComponent implements OnInit {
  skillData: Skill[] = [];

  constructor(private dialog: MatDialog, private skillControllerService: SkillControllerService) {}

  ngOnInit() {
    this.skillControllerService.findAll().subscribe(data => {
      this.skillData = data;
    });
  }

  openAddSkillDialog() {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      data: this.skillData
    });
  }

  openEditSkillDialog(skill) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      data: skill
    });
  }

  confirmRemoveFocus(skill) {
    if (confirm('Are you sure you want to remove ' + skill.name + '?')) {
      this.skillControllerService.remove(skill.id);
    }
  }
}
