import {Component, Input, OnInit} from '@angular/core';
import {SkillService} from '../services/skill.service';
import {TrainerService} from '../services/trainer.service';
import {S3CredentialService} from '../services/s3-credential.service';
import {Trainer} from '../domain/trainer';
import {Skill} from '../domain/skill';
import {NotificationService} from '../services/notification.service';
import {S3Credential} from '../domain/s3-credential';
import * as AWS from 'aws-sdk';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserInfoService} from '../services/user-info.service';
import {User} from '../domain/user';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  tId: number;
  lockProfile: boolean;

  // data
  skills: Skill[];
  myFile: FileList;
  creds: S3Credential;
  certFile: FileList = null;
  certName: string;
  skillsList: string[] = [];
  trainer: Trainer;

  constructor(private trainerService: TrainerService,
              private skillService: SkillService,
              private s3Service: S3CredentialService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private mat: MatIconRegistry, private dom: DomSanitizer) {
                mat.addSvgIcon('add', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_add_circle_outline_white_24px.svg'));
                mat.addSvgIcon('cancel', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_cancel_white_24px.svg'));
                mat.addSvgIcon('edit', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_edit_white_24px.svg'));
                mat.addSvgIcon('back', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_arrow_back_black_24px.svg'));
                mat.addSvgIcon('save', dom.bypassSecurityTrustResourceUrl('../../../assets/img/save.svg'));
                mat.addSvgIcon('sim', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_sim_card_black_24px.svg'));
                mat.addSvgIcon('x', dom.bypassSecurityTrustResourceUrl('../../../assets/img/letter-x.svg'));
                mat.addSvgIcon('star', dom.bypassSecurityTrustResourceUrl('../../../assets/img/star.svg'));
              }

  ngOnInit() {
    this.user = this.userInfoService.getUser();
//    if (this.user.role === 'VP of Technology' && this.tId === undefined) {
//      this.router.navigate(['/overview']);
//    }
    this.route.params.subscribe(params => this.tId = params.id);
    // data gathering

    // id is hard coded for testing. unless you click on a trainer in the trainer page.
    if (this.tId !== undefined) {
      this.lockProfile = true;
      this.trainerService.getById(this.tId)
        .subscribe(response => {
            this.trainer = response;
            if (this.trainer.skills.length !== 0) {
              this.trainer.skillsObject = [];
              this.skillService.getSkillsByIds(this.trainer.skills).subscribe(skillsObject => this.trainer.skillsObject = skillsObject);
            }
            this.rePullSkills();
          },
          () => this.showToast('Could not fetch trainer.'));
    } else {
      this.trainerService.getById(this.user ? this.user.id : 0)
      // this.trainerService.getByFirstNameAndLastName('Test', 'Trainer')
        .subscribe(response => {
            this.trainer = response;
            if (this.trainer.skills.length !== 0) {
              this.trainer.skillsObject = [];
              this.skillService.getSkillsByIds(this.trainer.skills).subscribe(skillsObject => this.trainer.skillsObject = skillsObject);
            }
            this.getAllSkills();
          },
          () => this.showToast('Could not fetch trainer.'));
      this.lockProfile = false;
    }

    // grab credentials for s3
    this.s3Service.getCreds().subscribe(response => this.creds = response,
      () => this.showToast('Failed to fetch credentials'));
  }

  backClick() {
    this.location.back();
  }

  getFiles(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.myFile = event.target.files;
  }

  getCert(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.certFile = event.target.files;
  }

  showToast(message) {
    this.notificationService.openSnackBar(message);
  }

  uploadResume() {
    const path = 'Resumes/' + this.trainer.trainerId + '_' + this.myFile[0].name;

    // This initializes a bucket with the keys obtained from Creds rest controller

    const bucket = new AWS.S3({
      apiVersion: '2006-03-01',
      accessKeyId: this.creds.ID,
      secretAccessKey: this.creds.SecretKey,
      region: 'us-east-1',
      httpOptions: {
        proxy: 'http://localhost:4200/'
      }
    });

    // set the parameters needed to put an object in the aws s3 bucket
    const params = {
      Body: this.myFile[0],
      Bucket: this.creds.BucketName,
      Key: path
    };

    // putting an object in the s3 bucket
    bucket.putObject(params, err => {
      if (err) {
        this.showToast(err);
        return;
      }
    });

    this.trainer.resume = this.myFile[0].name; // set the trainer resume to the file name(s3 file key to grab that object)

    // save the modified trainer resume field
    this.trainerService.update(this.trainer).subscribe(() => {
      },
      () => this.showToast('Failed to upload resume'),
      () => this.showToast('Resume upload finished'));

    // set my file to undefined so that update and label will be hidden in the html
    this.myFile = undefined;
  }

  grabResume() {
    const bucket = new AWS.S3({
      accessKeyId: this.creds.ID,
      secretAccessKey: this.creds.SecretKey,
      region: 'us-east-1'
    });

    // set the parameters needed to get an object from aws s3 bucket
    const params = {
      Bucket: this.creds.BucketName,
      Key: 'Resumes/' + this.trainer.trainerId + '_' + this.trainer.resume,
      Expires: 60 // url expires in 60 seconds with signed urls
    };

    // grabs a url to the object in the s3 bucket
    const url = bucket.getSignedUrl('getObject', params);

    // this will create a link, set download and href, and invoke the click action on it
    //  it will download the file
    const link = document.createElement('a');
    // link.download = "test.png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // called to save the current state of the trainers skills
  saveTSkills() {
    this.trainerService.update(this.trainer).subscribe(() => {
      },
      () => this.showToast('Could not save your skills.'),
      () => this.showToast('Skills have been saved!'));
  }

  // add a skill to the current trainer
  addSkill(skill) {
    // add the skill to the trainer skill array
    if (this.trainer.skills.length === 0) {
      this.trainer.skillsObject = [];
    }
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].name === skill) {
        this.trainer.skills.push(this.skills[i].skillId);
        this.trainer.skillsObject.push(this.skills[i]);
        break;
      }
    }

    this.remove(skill);
  }

  // remove the same skill from the skill list array
  remove(skill: any): void {
    const index = this.skillsList.indexOf(skill);

    if (index >= 0) {
      this.skillsList.splice(index, 1);
    }
  }

  // remove a trainer skill on the bottom
  removeSkill(skill) {
    for (let i = 0; i < this.trainer.skills.length; i++) {
      if (this.trainer.skills[i] === skill.skillId) {
        this.skillsList.push(skill.name);
        this.trainer.skills.splice(i, 1);
        this.trainer.skillsObject.splice(this.trainer.skillsObject.indexOf(skill), 1);
        break;
      }
    }
  }

  // func to upload a resume to the s3 bucket
  uploadCertification() {
    // set the path to certifications folder and use trainer id with the file name
    const path = 'Certifications/' + this.trainer.trainerId + '_' + this.certFile[0].name;

    // create a certification object to save in the database
    const certification = {
      file: path,
      name: this.certName,
      trainer: this.trainer.trainerId
    };
    //
    this.trainer.certifications.push(certification); // add the certification to the trainer

    // update trainer
    this.trainerService.update(this.trainer).subscribe(() => {
      },
      () => this.showToast('Failed saving certification.'),
      () => this.showToast('Certification has been saved.'));

    // create a aws s3 bucket
    const bucket = new AWS.S3({
      apiVersion: '2006-03-01',
      accessKeyId: this.creds.ID,
      secretAccessKey: this.creds.SecretKey,
      region: 'us-east-1',
      httpOptions: {
        proxy: 'http://localhost:4200/'
      }
    });

    // set the parameters needed to put an object in the aws s3 bucket
    const params = {
      Body: this.certFile[0],
      Bucket: this.creds.BucketName,
      Key: path,
      ACL: 'public-read'
    };

    // putting an object in the s3 bucket
    bucket.putObject(params, err => {
      if (err) {
        this.showToast('File could not be uploaded.');
      }
    });

    this.certFile = undefined;
    this.certName = undefined;
  }

  // remove a certification from a trainer(need to remove the certification from the certification Table)
  removeCertification(cert) {
    for (let i = 0; i < this.trainer.certifications.length; i++) {
      if (cert.name === this.trainer.certifications[i].name) {
        this.trainer.certifications.splice(i, 1);
      }
    }

    this.trainerService.update(this.trainer).subscribe(() => {
      },
      () => this.showToast('Could not update trainer.'),
      () => this.showToast('Removed Certification Successfully'));
  }

  // queries the database for skills. to be called after a change to the skills array
  rePullSkills() {
    this.skillsList = undefined;
    this.skillService.getAll().subscribe(response => {
        this.skills = response;
        this.skillsList = response.map(a => a.name);
      },
      () => this.showToast('Could not fetch skills.'));
  }

  // queries the database for the trainer. to be called after a change to the trainer's properties
  rePullTrainer() {
    this.trainer = undefined;
    this.trainerService.getById(this.tId)
      .subscribe(response => {
        this.trainer = response;
        this.trainer.skillsObject = [];
        if (this.trainer.skills.length !== 0) {
          this.skillService.getSkillsByIds(this.trainer.skills).subscribe(skillsObject => this.trainer.skillsObject = skillsObject);
        }
      },
      () => this.showToast('Could not fetch trainer.'));
  }

  // grab all the skills and create a skill list
  getAllSkills() {
    this.skillService.getAll().subscribe(response => {
      this.skills = response;
      for (let i = 0; i < this.skills.length; i++) {
        if ((this.trainer.skills.filter(a => this.skills[i].skillId === a)).length === 0) {
          this.skillsList.push(this.skills[i].name);
        }
      }
    }, () => this.showToast('Could not fetch skills.'));
  }
}
