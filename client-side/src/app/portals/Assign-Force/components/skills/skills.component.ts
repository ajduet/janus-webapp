import { Component, OnInit, Input } from '@angular/core';

import { Skill } from '../../model/Skill';
import { Trainer } from '../../model/Trainer';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  // data
  skills: Skill[] = [];

  lockSkills = true;
  disabled = true;
  skillsList: Skill[] = [];
  skill: Skill;
  @Input() trainer: Trainer;
  loading: boolean;

  constructor(private skillService: SkillControllerService, private trainerService: TrainerControllerService) {}

  ngOnInit() {
    this.getAllSkills();
  }

  updateSkills() {
    this.lockSkills = !this.lockSkills;
  }

  // called to save the current state of the trainers skills
  saveTSkills() {
    // this.trainerService.update(this.trainer).subscribe(() => {});
  }

  // add a skill to the current trainer
  addSkill(skill) {
    for (let i = 0; i < this.trainer.skills.length; i++) {
      if (this.skillsList[i] === skill) {
        this.trainer.skills.push(skill);
        this.skillsList.splice(i, 1);
        break;
      }
    }
  }

  // remove the same skill from the skill list array
  remove(skill: Skill): void {
    const index = this.trainer.skills.indexOf(skill);
    if (index >= 0) {
      this.trainer.skills.splice(index, 1);
    }
    console.log(this.trainer.skills);
  }

  // remove a trainer skill on the bottom
  removeSkill(skill) {
    for (let i = 0; i < this.trainer.skills.length; i++) {
      if (this.trainer.skills[i] === skill) {
        this.skillsList.push(skill.name);
        this.trainer.skills.splice(i, 1);
        break;
      }
    }
  }

  // grab all the skills and create a skill list
  getAllSkills() {
    this.loading = true;
    this.skillService
      .findAll()
      .toPromise()
      .then(response => {
        this.loading = false;
        this.skillsList = response;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }
}
