import {Component, Inject, OnInit} from '@angular/core';
import {Trainer} from '../domain/trainer';
import {Skill} from '../domain/skill';
import {NotificationService} from '../services/notification.service';
import {TrainerService} from '../services/trainer.service';
import {NavigationExtras, Params, Router} from '@angular/router';
import {S3CredentialService} from '../services/s3-credential.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {PtoService} from '../services/pto.service';
import * as AWS from 'aws-sdk';
import {S3Credential} from '../domain/s3-credential';
import {SkillService} from '../services/skill.service';
import {UserInfoService} from '../services/user-info.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
  trainers: Trainer[];
  isManager: boolean;
  creds: S3Credential;

  constructor(private notificationService: NotificationService,
              private trainerService: TrainerService,
              private skillService: SkillService,
              private s3Service: S3CredentialService,
              private ptoService: PtoService,
              private userInfoService: UserInfoService,
              private http: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private mat: MatIconRegistry, private dom: DomSanitizer) {
                mat.addSvgIcon('add', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_add_circle_outline_white_24px.svg'));
                mat.addSvgIcon('cancel', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_cancel_white_24px.svg'));
                mat.addSvgIcon('calendar',
                 dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_perm_contact_calendar_white_24px.svg'));
                mat.addSvgIcon('people', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_people_black_48px.svg'));
                mat.addSvgIcon('download', dom.bypassSecurityTrustResourceUrl('../../../assets/img/download.svg'));
              }

  ngOnInit() {
    this.isManager = false;
    if (this.userInfoService.getUser().role === 'VP of Technology') {
      this.isManager = true;
    }

    this.getAll();
    this.s3Service.getCreds().subscribe(response => this.creds = response,
      () => this.showToast('Failed to fetch credentials'));
  }

  // Displays snackbar message notifications
  showToast(message) {
    this.notificationService.openSnackBar(message);
  }

  // Adds a trainer by popping up a dialog box
  addTrainer(): void {
    const trainer: Trainer = {
      trainerId: null,
      username: '',
      firstName: '',
      lastName: '',
      skills: [],
      skillsObject: [],
      certifications: [],
      active: true,
      resume: null,
    };
    const dialogRef = this.dialog.open(TrainerDialogComponent, {
      width: '450px',
      data: {
        trainer: trainer
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.trainers.push(result);
          this.trainerService.create(result)
            .subscribe(data => {
                this.showToast('Trainer ' + trainer.firstName + ' ' + trainer.lastName + ' has been added');
                this.rePullTrainers();
              },
              error => {
                this.showToast('Failed to add trainer ' + trainer.firstName + ' ' + trainer.lastName);
              }
            );

        }
      });

  }

  // Gets all trainers and stores them in variable trainers
  getAll() {
    this.trainerService.getAll()
      .subscribe(
        data => {
          this.trainers = data;
          this.trainers.forEach( trainer => {
            if (trainer.skills.length !== 0) {
              this.skillService.getSkillsByIds(trainer.skills)
                .subscribe(response => trainer.skillsObject = response);
            }
          });
        },
        error => {
          this.showToast('Could not fetch trainers');
        }
      );
  }

  // After a change is made to trainers, clears trainers and retrieves the current from database
  rePullTrainers() {
    this.trainers = undefined;
    this.trainerService.getAll()
      .subscribe(
        data => {
          this.trainers = data;
          this.trainers.forEach( trainer => {
            if (trainer.skills.length !== 0) {
              this.skillService.getSkillsByIds(trainer.skills)
                .subscribe(response => trainer.skillsObject = response);
            }
          });
        },
        error => {
          this.showToast('Could not fetch trainers');
        }
      );

  }

  convertUnavailability(incoming) {
    return new Date(incoming);
  }


  showCalendar() {
    this.trainerService.authorize();
    // this.http.get("https://unavailable-service.cfapps.io/api/v2/google/googleStatus")
    //   .subscribe( response => {
    //     if(response !== null){
    //       this.trainerService.authorize();
    //     } else {
    //       this.googleAuth();
    //     }
    //
    // }) Comment due to errors in google login coming back from backend

  }

  // Navigates to profile of the trainer clicked
  goToTrainer(trainer: Trainer) {
    const id = trainer.trainerId;
    this.router.navigate(['/profile/' + id]);
  }

  // Downloads a copy of the trainer's resume
  grabS3Resume(trainer: Trainer) {
    const filename = trainer.resume;
    event.stopPropagation();

    // show toast if there is no resume for this trainer in the database
    if (filename == null) {
      this.showToast(trainer.firstName + ' ' + trainer.lastName + ' does not have a resume uploaded');
      return;
    }

    const bucket = new AWS.S3({
      accessKeyId: this.creds.ID,
      secretAccessKey: this.creds.SecretKey,
      region: 'us-east-1'
    });

    // set the parameters needed to get an object from aws s3 bucket
    const params = {
      Bucket: this.creds.BucketName,
      Key: 'Resumes/' + trainer.trainerId + '_' + trainer.resume,
      Expires: 60 // url expires in 60 seconds with signed urls
    };

    // grabs a url to the object in the s3 bucket
    const url = bucket.getSignedUrl('getObject', params);

    // this will create a link, set download and href, and invoke the click action on it
    // it will download the file
    const link = document.createElement('a');
    // link.download = "test.png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    event.stopPropagation();


  }

  // Sets the active trainer to inactive
  removeTrainer(trainer: Trainer) {
    trainer.active = false;
    this.trainerService.update(trainer)
      .subscribe(
        data => {
          this.showToast(trainer.firstName + ' ' + trainer.lastName + ' was deactivated successfully');
        },
        error => {
          this.showToast('Failed to deactivate ' + trainer.firstName + ' ' + trainer.lastName);
        }
      );
  }

  // Sets the inactive trainer to active
  activateTrainer(trainer: Trainer) {
    trainer.active = true;
    this.trainerService.update(trainer)
      .subscribe(
        data => {
          this.showToast(trainer.firstName + ' ' + trainer.lastName + ' was activated successfully');
        },
        error => {
          this.showToast('Failed to activate ' + trainer.firstName + ' ' + trainer.lastName);
        }
      );
  }

// Takes array of skills and formats their names into a string
  joinObjArrayByName(Skillz: Skill[]) {
    if (Skillz === undefined) {
      return;
    }
    let skillslist = '';
    for (let i = 0; i < Skillz.length; i++) {
      skillslist += Skillz[i].skillName;
      if (i !== Skillz.length - 1) {
        skillslist += ', ';
      }
    }
    return skillslist;
  }

  googleAuth() {
    // this.router.navigate(['api/v2/google/google']);
    window.location.href = 'https://unavailable-service.cfapps.io/api/v2/google/google';
  }

}

// Used for the display of new Trainer dialog box
@Component({
  selector: 'app-trainer-dialog',
  templateUrl: './trainer-dialog.component.html',
})
export class TrainerDialogComponent {

  constructor(public dialogRef: MatDialogRef<TrainerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    event.stopPropagation();
    this.dialogRef.close();
  }


}
