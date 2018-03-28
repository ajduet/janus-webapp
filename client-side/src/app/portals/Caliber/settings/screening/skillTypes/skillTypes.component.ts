import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
import { Bucket } from '../entities/Bucket';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import {BucketsService} from'../services/buckets.service';
import {AlertsService} from '../../../services/alerts.service'


@Component({
  selector: 'app-skillTypes',
  templateUrl: './skillTypes.component.html',
  styleUrls: ['./skillTypes.component.css'],
})

export class SkillTypesComponent implements OnInit {

  public skillTypes:any[]=[];
  public inactiveSkillTypes:any[]=[];
  public allSkillTypes: SkillType[]=[];
  public allBuckets: Bucket[] = [];
  public bucketWeightSum: number = 0;
  public bucketsAndWeights = [];
  public skillType: SkillType;
  public singleSkillType: SkillType;
  public error: boolean;
  public modalServiceRef;
  public singleSkillTypeBucketIds: number[] = [];



  testSkillTypeBuckets: SkillTypeBucket[] = [
      { skillTypeId: 0, bucketId: 0, weight: 50 },
      { skillTypeId: 0, bucketId: 1, weight: 20 },
      { skillTypeId: 0, bucketId: 2, weight: 30 }
  ]





  removeElement(item:any){
    let thing:any;
    for(let i = 0 ;i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.skillTypeName == item.skillTypeName){
        if(thing.isActive){
            thing.isActive = !thing.isActive;
            this.skillTypeService.deactivateSkillType(thing.skillTypeId).subscribe();
        } else {
            thing.isActive = !thing.isActive;
            this.skillTypeService.activateSkillType(thing.skillTypeId).subscribe();
        }
      }
      this.setSkillTypes();
    }
  }
  setSkillTypes(){
    let thing:any;
    this.skillTypes = [];
    this.inactiveSkillTypes = [];
    for(let i = 0; i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.isActive == true){
        this.skillTypes[this.skillTypes.length]=thing;
    }else if (thing.isActive == false){
        this.inactiveSkillTypes[this.inactiveSkillTypes.length]=thing;
      }
    }
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private skillTypeService: SkillTypesService,
    private bucketsService:BucketsService,
    private alertsService:AlertsService,
  ) { }

    open(content) {
      this.modalServiceRef = this.modalService.open(content);
      this.modalServiceRef.result.then((result) => {
        this.resetFields();
      }, (reason) => {
        this.resetFields();
      });
      event.stopPropagation();
    }

    hasBuckets: boolean;

    editSkillType(skillType){
        this.singleSkillType = {
            skillTypeName: skillType.skillTypeName,
            skillTypeId: skillType.skillTypeId,
            skillTypeDescription: skillType.skillTypeDescription,
            isActive: true,
            buckets: [],
            weights: []
        }
        this.skillTypeService.getBucketsBySkillType(skillType.skillTypeId).subscribe(results => {
            let skillTypeBucketAndWeights;
            skillTypeBucketAndWeights = results;
            if(skillTypeBucketAndWeights.bucket.length != 0){
                this.hasBuckets = true;
                this.singleSkillType.buckets = skillTypeBucketAndWeights.bucket;
                this.singleSkillType.weights = skillTypeBucketAndWeights.weight;
            } else {
                this.hasBuckets = false;
            }
            this.combineBucketsAndWeights();
            for(let index of this.singleSkillType.buckets){
                this.singleSkillTypeBucketIds.push(index.bucketId);
            }
        })

    }

    checkContains(bucketId){
        if(this.singleSkillType){
            return this.singleSkillTypeBucketIds.includes(bucketId);
        }
        return false;
    }

    addToSkillTypeBuckets(bucket){
        if(this.singleSkillType){
            this.singleSkillType.buckets.push(bucket);
            this.singleSkillType.weights.push(0);
            this.singleSkillTypeBucketIds.push(bucket.bucketId);
            // this.bucketsAndWeights.push({weights: 0, bucketCategory: ''});
            this.combineBucketsAndWeights();
        }
    }

    removeFromSkillTypeBuckets(bucket){
        if(this.singleSkillType){
            for(let singleBucketIndex in this.singleSkillType.buckets){
                if(this.singleSkillType.buckets[singleBucketIndex].bucketCategory == bucket){
                    this.singleSkillType.buckets.splice(Number(singleBucketIndex), 1);
                    this.singleSkillType.weights.splice(Number(singleBucketIndex), 1);
                    this.singleSkillTypeBucketIds.splice(Number(singleBucketIndex), 1);
                }
            }
            this.combineBucketsAndWeights();
        }
    }

    combineBucketsAndWeights(){
        if(this.bucketsAndWeights.length != 0){
            for(let index in this.bucketsAndWeights) {
                this.singleSkillType.weights[index] = this.bucketsAndWeights[index].weights;
            }
        }
        this.bucketsAndWeights = [];
        for(let index in this.singleSkillType.buckets){
            this.bucketsAndWeights.push({"bucketCategory":this.singleSkillType.buckets[index].bucketCategory, "weights":this.singleSkillType.weights[index]});
        }
    }

    checkMinMax(index: number){
        if(this.bucketsAndWeights[index].weights > 100){
            this.bucketsAndWeights[index].weights = 100;
        } else if(this.bucketsAndWeights[index].weights < 0){
            this.bucketsAndWeights[index].weights = 0;
        }
    }

    updateSkillType(modal: SkillType){
        this.skillType = modal;
        this.skillType.skillTypeId = this.singleSkillType.skillTypeId;
        let addedBucket = false;
        this.bucketWeightSum = 0;
        if(this.bucketsAndWeights){
            for(let index in this.bucketsAndWeights){
                addedBucket = true;
                this.bucketWeightSum += this.bucketsAndWeights[index].weights;
            }
        }
        if(this.bucketWeightSum == 100 || this.bucketsAndWeights.length == 0){
            this.modalServiceRef.close();
            let bucketsId = [];
            let weights = [];
            // console.log(this.singleSkillTypeBucketIds);
            // console.log(this.bucketsAndWeights);
            for(let index in this.bucketsAndWeights){
                bucketsId.push(this.singleSkillTypeBucketIds[index]);
                weights.push(this.bucketsAndWeights[index].weights);
            }
            if(this.hasBuckets){
                console.log(this.singleSkillType.skillTypeName);
                this.skillTypeService.updateSkillTypeBuckets(this.skillType, bucketsId, weights).subscribe();
                console.log(this.singleSkillType.skillTypeName);

            } else {
                this.skillTypeService.updateSkillTypeBuckets(this.skillType, bucketsId, weights).subscribe();
            }
            this.grabAllSkillTypes()
        }
        else {
            this.error = true;
        }
    }


    createNewSkillType(modal: SkillType){
        this.skillType = modal;
        this.skillTypeService.createSkillType(this.skillType).subscribe(results => {
            this.grabAllSkillTypes();
        })
    }

    checkBucketSum(){
        this.bucketWeightSum = 0;
        for(let bucket of this.bucketsAndWeights){
            this.bucketWeightSum += bucket.weights;
        }
        if(this.bucketWeightSum == 100){
            this.error = false;
        } else {
            this.error = true;
        }
    }

    grabAllSkillTypes(){
        this.skillTypeService.getSkillTypes().subscribe(results => {
            this.allSkillTypes = results;
            this.setSkillTypes();
        });
    }

    grabAllBuckets(){
        this.bucketsService.getAllBuckets().subscribe(results =>{
            this.allBuckets = results;
        })
    }

    resetFields(){
        this.singleSkillType = null;
        this.bucketsAndWeights = [];
        this.error = false;
        this.singleSkillTypeBucketIds = [];
    }
    savedSuccessfully(){
        this.alertsService.success("Saved successfully");
    }

  ngOnInit() {
    this.grabAllSkillTypes();
    this.grabAllBuckets();
  }

}