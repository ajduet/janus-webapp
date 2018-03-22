import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { TagService } from '../../services/tag/tag.service';

import { Tag } from '../../entities/tag';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(public tagService : TagService) { }


  public traineeName: string;
  public traineeTrack: string;

  public tagList: Tag[];

  form = new FormGroup({
    comment: new FormControl("", []),
  })

  ngOnInit() {
    //Get candidate name from another component
    //Initialize the tag lists
    this.tagService.tagList = [];
    this.tagService.tagListChecked = [];

    this.traineeName = "Tommy";
    this.traineeTrack = "Business Analyst";

    //Get all tags
    /*this.tagList = [];
    this.tagService.getAllTags().subscribe(data => {
      this.tagList = data;
    })*/

    //Get all test tags
    this.tagList = [];
    this.tagList = this.tagService.getAllTestTags();
  }

  updateTagList(changedTag : Tag, checked : boolean) {

    if(checked) {
      this.tagService.tagListChecked.push(changedTag);
    } else {
      let index = this.tagService.tagListChecked.findIndex(x => x == changedTag);
      this.tagService.tagListChecked.splice(index);
    }
    console.log(changedTag.tagName);
  }

  onSubmit(){
    let introComments = this.form.get("comment").value;

    //Send the comments to the appropriate service method saves them to the DB
  }
}