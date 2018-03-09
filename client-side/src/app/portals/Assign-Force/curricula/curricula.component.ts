import {Component, Inject, OnInit} from '@angular/core';
import {Curriculum} from '../domain/curriculum';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {S3CredentialService} from '../services/s3-credential.service';
import {CurriculaService} from '../services/curricula.service';
import {NotificationService} from '../services/notification.service';
import {Skill} from '../domain/skill';
import {SkillService} from '../services/skill.service';
import {UserInfoService} from '../services/user-info.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-curricula',
  templateUrl: './curricula.component.html',
  styleUrls: ['./curricula.component.css']
})
export class CurriculaComponent implements OnInit {

  currData: Curriculum[] = [
    {currId: 1, name: '.NET', core: true, active: true,
      skills: ['Core .NET', 'AngularJS', 'C#', 'ASP.NET', 'MVC', 'T-SQL'],
    skillObjects: null},
    {currId: 2, name: 'JAVA', core: true, active: true,
      skills: ['Core JAVA', 'Angular4', 'HTML5', 'Spring', 'MVC', 'SQL'],
      skillObjects: null},
    {currId: 3, name: 'SDET', core: true, active: true,
      skills: ['Core SDET', 'Python', 'UFT', 'Manual Testing'],
      skillObjects: null},
    {currId: 4, name: 'IntelliJ', core: true, active: true,
      skills: ['JAVA'],
      skillObjects: null},
    {currId: 5, name: 'Salesforce', core: true, active: true,
      skills: [], skillObjects: null},
    {currId: 6, name: 'Microservices', core: false, active: true,
      skills: ['Core JAVA', 'JUnit', 'Spring', 'REST', 'MVC', 'SOAP'],
      skillObjects: null},
    {currId: 7, name: 'Pega', core: false, active: true,
      skills: ['Pega'],
      skillObjects: null},
    {currId: 8, name: 'Oracle Fusion', core: false, active: true,
      skills: ['Core JAVA', 'Oracle SQL'],
      skillObjects: null},
    {currId: 9, name: 'C++', core: true, active: false,
      skills: ['Core C++'], skillObjects: null}
  ];

  /* variables */
  isAdmin: Boolean = true;
  curricula: Curriculum[];
  skills: Skill[];

  /* constructor */
  constructor(public dialog: MatDialog,
              private router: Router,
              private s3Service: S3CredentialService,
              private curriculaService: CurriculaService,
              private skillService: SkillService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private mat: MatIconRegistry, private dom: DomSanitizer) {
                mat.addSvgIcon('add', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_add_circle_outline_white_24px.svg'));
                mat.addSvgIcon('cancel', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_cancel_white_24px.svg'));
                mat.addSvgIcon('edit', dom.bypassSecurityTrustResourceUrl('../../../assets/img/ic_edit_white_24px.svg'));
              }

  ngOnInit() {
    this.isAdmin = false;
    if (this.userInfoService.getUser().role === 'VP of Technology') {
      this.isAdmin = true;
    }
    /* grab curricula from server */
    this.getAllSkills();
    this.getAllCurricula();

  }

  /* Functions to services*/
  getAllCurricula() {
    this.curriculaService.getAll()
      .subscribe(data => {
          this.curricula = data;
          for (const curr of this.curricula){
            if (curr.skills.length !== 0) {
              this.skillService.getSkillsByIds(curr.skills)
                .subscribe(skillData => {
                  curr.skillObjects = skillData;
                  // console.log(skillData);
                }, error => {
                  console.log('Failed fetching id = ', curr.currId);
                });
            }
          }
          console.log(this.curricula);
        }, error => {
          this.showToast('Failed to fetch curricula');
        }
      );
  }

  getAllActiveCurricula() {
    this.curriculaService.getAllActive()
      .subscribe(data => {
          this.curricula = data;
          for (const curr of this.curricula){
            if (curr.skills.length !== 0) {
              this.skillService.getSkillsByIds(curr.skills)
                .subscribe(skillData => {
                  curr.skillObjects = skillData;
                  // console.log(skillData);
                }, error => {
                  console.log('Failed fetching id = ', curr.currId);
                });
            }
          }
          console.log(this.curricula);
        }, error => {
          this.showToast('Failed to fetch curricula');
        }
      );
  }

  getAllSkills() {
    this.skillService.getAll()
      .subscribe(data => {
        this.skills = data;
        console.log(this.skills);
      }, error => {
        this.showToast('Failed to fetch skills');
        }
      );
  }

  getSkillsByIds(ids) {
    this.skillService.getSkillsByIds(ids)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log('Failed to fetch skills through IDs');
      });
  }



  /* Functions to click events */

  clickTest(evt) {
    console.log('button clicked');
    evt.stopPropagation();
  }

  /* toast message */
  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }

  /* Create Curriculum button*/
  createCore(evt): void {
    const dialogRef  = this.dialog.open(CurriculaCurriculumDialogComponent,
      {
            width: '250px',
            data: {
              isNew: true,
              isCore: true}
      });

    dialogRef.afterClosed().subscribe(result => { // the result can be specified in close(result) in dialog component.
      console.log('create-core dialog closed');
      if (result === true) {
        this.getAllCurricula(); // reload all curriculum (could possibly do get new one, but update could be complicated).
      }
      });
    evt.stopPropagation();
  }

  createFocus(evt): void {
    const dialogRef  = this.dialog.open(CurriculaCurriculumDialogComponent,
      {
            width: '250px',
            data: {
              isNew: true,
              isCore: false}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('create-focus dialog closed');
      if (result === true) {
        this.getAllCurricula();
      }
    });
    evt.stopPropagation();
  }

  editCurr(evt, curriculum): void {
    const dialogRef  = this.dialog.open(CurriculaCurriculumDialogComponent,
      {
        width: '250px',
        data: {
          isNew: false,
          curriculum: curriculum
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('edit-curriculum dialog closed');
      this.getAllCurricula();
    });
    evt.stopPropagation();
  }

  removeCurr(evt, curriculum): void {
    const dialogRef  = this.dialog.open(CurriculaRemovalDialogComponent,
      {
        width: '400px',
        data: curriculum
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('remove-curriculum dialog closed');
      if (result === true) {
      this.getAllCurricula();
      }
    });
    evt.stopPropagation();
  }

  createSkill(evt): void {
    const dialogRef  = this.dialog.open(CurriculaCreateSkillDialogComponent,
      {
        width: '250px',
        data: this.skills
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('create-skill dialog closed');
      if (result === true) {
        this.getAllSkills();
      }
    });
    evt.stopPropagation();
  }

}

/***************************** Curriculum Dialog ****************************************/
@Component({
  selector: 'app-curricula-curriculum-dialog',
  templateUrl: 'curricula-curriculum-dialog.component.html',
  styleUrls: ['./curricula.component.css']
})
export class CurriculaCurriculumDialogComponent implements OnInit {

  /* variables */
  curriculum: Curriculum = {
    currId: null,
    name: '',
    core: null,
    active: null,
    skills: null,
    skillObjects: null
  };
  skillFormCtrl = new FormControl();
  nameFormCtrl = new FormControl('', [
    Validators.required
  ]);
  selected;

  skillList;
  /*skillList = [
    'AngularJS',
    'Angular4',
    'ASP.NET MVC',
    'ASP.NET WEB API',
    'C',
    'C#',
    'C++',
    'Core.NET',
    'Core Java',
    'Core SDET',
    'CSS',
    'HTML',
    'SQL',
    'Spring'
  ];*/

  constructor(
    public dialogRef: MatDialogRef<CurriculaCurriculumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private s3Service: S3CredentialService,
    private curriculaService: CurriculaService,
    private skillService: SkillService,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.skillService.getAll()
      .subscribe(skillData => {
        this.skillList = skillData;
        // console.log(this.skillList);
      });
    if (this.data.isNew === false) {
      // console.log(this.data);
      this.curriculum = this.data.curriculum;
      this.selected = this.curriculum.skills;
    }
  }


  onNoClick(): void {
      this.dialogRef.close(false);
  }

  clickSave(evt) {
    if (this.data.isNew === true) {
      this.saveCurriculum();
    } else {
      this.updateCurriculum();
    }
  }

  saveCurriculum() {
    // console.log(this.nameFormCtrl.value);
    // console.log(this.skillFormCtrl.value);
    // console.log(this.data.isCore);
    const newCurr: Curriculum = {
      currId: null,
      name: this.nameFormCtrl.value,
      core: this.data.isCore,
      active: true,
      skills: this.skillFormCtrl.value,
      skillObjects: null
    };
    console.log(newCurr.skillObjects);
    // following block is unnecessary since now option value is the id instead of skill object
    /*let skillIds: number[] = [];
    for (let skill of newCurr.skillObjects) {
      skillIds.push(skill.skillId);
    }
    newCurr.skills = skillIds;*/
    this.curriculaService.create(newCurr)
      .subscribe(retData => {
        console.log(retData);
        this.showToast('Curriculum: ' + retData.name + ' Created.');
      }, error => {
        this.showToast('Failed to create new core.');
      });

    this.dialogRef.close(true);
    // location.reload();
  }

  updateCurriculum() {
    console.log('Old Curriculum: ');
    console.log(this.data.curriculum);
    console.log('New Skill List: ');
    console.log(this.skillFormCtrl.value);
    const updatedCurr = this.data.curriculum;
    updatedCurr.name = this.nameFormCtrl.value;
    updatedCurr.skills = this.skillFormCtrl.value;
    console.log('Updated Curriculum: ');
    console.log(updatedCurr);
    this.curriculaService.update(updatedCurr)
      .subscribe(retData => {
        console.log(retData);
        this.showToast('Curriculum: ' + retData.name + ' Modified. ');
      }, error => {
        this.showToast('Failed to edit curriculum.');
      });
    this.dialogRef.close(true);
  }

  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }
}



/************************* Create Skill Dialog ****************************/
@Component({
  selector: 'app-curricula-create-skill-dialog',
  templateUrl: 'curricula-create-skill-dialog.component.html',
  styleUrls: ['./curricula.component.css']
})
export class CurriculaCreateSkillDialogComponent {
  /* Variable */
  skillFormCtrl = new FormControl();
  newSkill: Skill = {
    skillId: null,
    name: null,
    active: true
  };
  skills: Skill[] = this.data;
  found = false;

  constructor(
    public dialogRef: MatDialogRef<CurriculaCreateSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private s3Service: S3CredentialService,
    private skillService: SkillService,
    private notificationService: NotificationService) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  createSkill() {
    this.newSkill.name = this.skillFormCtrl.value;
    console.log('New Skill: ');
    console.log(this.newSkill);
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].name === this.newSkill.name) {
        this.found = true;
        this.showToast('Skill: ' + this.newSkill.name + ' already exist!');
        this.dialogRef.close(false);
      }
    }
    if (this.found === false) {
      this.skillService.create(this.newSkill)
        .subscribe(retData => {
          this.showToast('Skill: ' + retData.name + ' created. ');
        }, error => {
          this.showToast('Failed to create new skill. ');
        });
      this.dialogRef.close(true);
    }
  }

  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }
}

/************************* Curriculum Removal Dialog **********************************/
@Component({
  selector: 'app-curricula-removal-dialog',
  templateUrl: 'curricula-removal-dialog.component.html',
  styleUrls: ['./curricula.component.css']
})
export class CurriculaRemovalDialogComponent {
  /* variables */
  curriculum: Curriculum = {
    currId: null,
    name: '',
    core: null,
    active: null,
    skills: null,
    skillObjects: null
  };

  constructor(
    public dialogRef: MatDialogRef<CurriculaRemovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private s3Service: S3CredentialService,
    private curriculaService: CurriculaService,
    private skillService: SkillService,
    private notificationService: NotificationService) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  removeCurriculum() {
    this.curriculum = this.data;
    console.log('Curriculum to be deleted: ');
    console.log(this.curriculum);
    this.curriculaService.delete(this.curriculum.currId)
      .subscribe( retData => {
        if (retData === null) {
          this.showToast('Curriculum Deleted.');
        } else {
          this.showToast('Fail to delete curriculum.');
        }
      }, error => {
        this.showToast('Fail to delete curriculum. ');
      });
    this.dialogRef.close(true);
  }

  showToast(msg) {
    this.notificationService.openSnackBar(msg);
  }
}
