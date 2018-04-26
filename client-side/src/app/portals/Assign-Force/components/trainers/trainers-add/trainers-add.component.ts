import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Trainer } from '../../../model/Trainer';
import { Skill } from '../../../model/Skill';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';

@Component({
  selector: 'app-trainers-add',
  templateUrl: './trainers-add.component.html',
  styleUrls: ['./trainers-add.component.css']
})
export class TrainersAddComponent implements OnInit {
  trainer: Trainer = {
    id: 0,
    firstName: '',
    lastName: '',
    skills: [],
    certifications: '',
    active: true,
    resume: '',
    preferredLocation: null,
    unavailabilities: []
  };

  data = {
    trainer: this.trainer
  };

  constructor(
    public dialogRef: MatDialogRef<TrainersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public dataP: any,
    private trainerService: TrainerControllerService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.trainer.firstName !== '' &&
      this.trainer.lastName !== '' &&
      this.trainer.firstName.charAt(0).match(/[A-Za-z]/i) &&
      this.trainer.lastName.charAt(0).match(/[A-Za-z]/i)
    ) {
      const fn = this.trainer.firstName.charAt(0).toUpperCase() + this.trainer.firstName.substring(1).toLowerCase();
      this.trainer.firstName = fn;

      let f = '';

      for (let i = 0; i < this.trainer.firstName.length; i++) {
        if (this.trainer.firstName.charAt(i) === ' ') {
          f += fn.charAt(i);
          f += fn.charAt(i + 1).toUpperCase();
          i++;
        } else {
          f += fn.charAt(i);
        }
      }

      this.trainer.firstName = f;

      const ln = this.trainer.lastName.charAt(0).toUpperCase() + this.trainer.lastName.substring(1).toLowerCase();

      let l = '';

      for (let i = 0; i < this.trainer.lastName.length; i++) {
        if (this.trainer.lastName.charAt(i) === ' ') {
          l += ln.charAt(i);
          l += ln.charAt(i + 1).toUpperCase();
          i++;
        } else {
          l += ln.charAt(i);
        }
      }

      this.trainer.lastName = l;

      this.trainerService
        .create(this.trainer)
        .toPromise()
        .then(t => {
          console.log(t);
        })
        .catch(error => {
          console.log(error);
        });

      console.log(this.trainer);
    }
  }

  onNoClick(evt): void {
    evt.preventDefault();
    this.dialogRef.close();
  }
}
