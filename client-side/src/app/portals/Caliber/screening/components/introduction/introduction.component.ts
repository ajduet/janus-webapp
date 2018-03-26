import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { SimpleTraineeService } from "../../services/simpleTrainee/simple-trainee.service";
import { SkillTypeService } from '../../services/skillType/skill-type.service';
import { TagService } from '../../services/tag/tag.service';
import { BucketService } from "../../services/bucket/bucket.service";

import { Tag } from '../../entities/tag';
import { SkillType } from '../../entities/skillType';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(public tagService : TagService, private simpleTraineeService: SimpleTraineeService,
    private skillTypeService: SkillTypeService, private bucketService: BucketService) { }


  public traineeName: string;
  public traineeTrack: string;

  public tagList: Tag[];

  form = new FormGroup({
    comment: new FormControl("", [])
  })

  ngOnInit() {
    //Get candidate name from another component
    this.tagService.tagListChecked = [];

    this.traineeName = this.simpleTraineeService.getSelectedCandidate().firstname + " " 
      + this.simpleTraineeService.getSelectedCandidate().lastname;
    let tempSkillTypes: SkillType[];
    this.skillTypeService.getSkillTypes().subscribe(skillTypes => tempSkillTypes = skillTypes);
    this.traineeTrack = tempSkillTypes[this.simpleTraineeService.getSelectedCandidate().skillTypeID].skillTypeName;

    //Get all test tags
    this.getTags();
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe(
      allTags => {
        this.tagList = allTags;
      }
    );
  }

  updateTagList(changedTag : Tag, checked : boolean) {

    if(checked) {
      this.tagService.tagListChecked.push(changedTag);
    } else {
      let index = this.tagService.tagListChecked.findIndex(x => x == changedTag);
      this.tagService.tagListChecked.splice(index,1);
    }
    console.log(changedTag.tagName);
  }

  onSubmit(){
    let introComments = this.form.get("comment").value;

    //Send the comments to the appropriate service method saves them to the DB
  }

  skillChosen(): boolean {
    return (!(this.tagService.tagListChecked.length > 0));
  }
}