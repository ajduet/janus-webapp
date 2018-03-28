import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
import { Bucket } from '../entities/Bucket';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import { BucketsService } from '../services/buckets.service';
import { AlertsService } from '../../../services/alerts.service';


@Component({
    selector: 'app-skillTypes',
    templateUrl: './skillTypes.component.html',
    styleUrls: ['./skillTypes.component.css'],
})

export class SkillTypesComponent implements OnInit {

    public skillTypes: any[] = [];
    public inactiveSkillTypes: any[] = [];
    public allSkillTypes: SkillType[] = [];
    public allBuckets: Bucket[] = [];
    public bucketWeightSum: number = 0;
    public bucketsAndWeights = [];
    public skillType: SkillType;
    public singleSkillType: SkillType;
    public error: boolean;
    public modalServiceRef;
    public singleSkillTypeBucketIds: number[] = [];


    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private skillTypeService: SkillTypesService,
        private bucketsService: BucketsService,
        private alertsService: AlertsService,
        private tab: NgbTabset,
    ) { }

    removeElement(item: any) {
        let thing: any;
        for (let i = 0; i < this.allSkillTypes.length; i++) {
            thing = this.allSkillTypes[i];
            if (thing.skillTypeName == item.skillTypeName) {
                if (thing.isActive) {
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
    setSkillTypes() {
        let thing: any;
        this.skillTypes = [];
        this.inactiveSkillTypes = [];
        for (let i = 0; i < this.allSkillTypes.length; i++) {
            thing = this.allSkillTypes[i];
            if (thing.isActive == true) {
                this.skillTypes[this.skillTypes.length] = thing;
            } else if (thing.isActive == false) {
                this.inactiveSkillTypes[this.inactiveSkillTypes.length] = thing;
            }
        }
    }

    /**
    * Opens the modal for creating and editing skill SkillType
    * Resets fields clears the data within set fields
    */
    open(content) {
        this.modalServiceRef = this.modalService.open(content);
        this.modalServiceRef.result.then((result) => {
            this.resetFields();
        }, (reason) => {
            this.resetFields();
        });
        event.stopPropagation();
    }

    /**
    * Stores information about the skill type that was selected
    * If there are any buckets associated to the skill type,
    * set the array to the selected buckets to the array
    * @param skillType: selected skill type
    */
    editSkillType(skillType) {
        this.singleSkillType = {
            skillTypeName: skillType.skillTypeName,
            skillTypeId: skillType.skillTypeId,
            skillTypeDescription: skillType.skillTypeDescription,
            isActive: true,
            buckets: [],
            weights: [],
        }
        this.skillTypeService.getBucketsBySkillType(skillType.skillTypeId).subscribe(results => {
            let skillTypeBucketAndWeights;
            skillTypeBucketAndWeights = results;
            if (skillTypeBucketAndWeights.bucket.length != 0) {
                this.singleSkillType.buckets = skillTypeBucketAndWeights.bucket;
                this.singleSkillType.weights = skillTypeBucketAndWeights.weight;
            }
            this.combineBucketsAndWeights();
            for (let index of this.singleSkillType.buckets) {
                this.singleSkillTypeBucketIds.push(index.bucketId);
            }
        })

    }

    /**
    * Checks which buckets are currently associated with the selected skill Type
    * If a bucket from all buckets already belong to the selected skill type, hide the bucket
    * Includes with objects giving wrong results, so used an
    * array of bucket ids to utilize the includes method.
    * @param bucketId: Id of single bucket
    */
    checkContains(bucketId) {
        if (this.singleSkillType) {
            return this.singleSkillTypeBucketIds.includes(bucketId);
        }
        return false;
    }

    /**
    * Adds a new bucket object to the selected skill type.
    * Set weight of new bucket to be 0
    * Add the bucketId to the array of Ids of selected skill type
    * @param bucket: bucket object needed to be added to skill types.
    */
    addToSkillTypeBuckets(bucket) {
        if (this.singleSkillType) {
            this.singleSkillType.buckets.push(bucket);
            this.singleSkillType.weights.push(0);
            this.singleSkillTypeBucketIds.push(bucket.bucketId);
            this.combineBucketsAndWeights();
        }
    }

    /**
    * Removes all references to the bucket that is associated to the skill type
    * @param bucket: bucket object to be removed from all associates to the skill type
    */
    removeFromSkillTypeBuckets(bucket) {
        if (this.singleSkillType) {
            for (let singleBucketIndex in this.singleSkillType.buckets) {
                if (this.singleSkillType.buckets[singleBucketIndex].bucketCategory == bucket) {
                    this.singleSkillType.weights.splice(Number(singleBucketIndex), 1);
                    this.singleSkillTypeBucketIds.splice(Number(singleBucketIndex), 1);
                    this.bucketsAndWeights.splice(Number(singleBucketIndex), 1);
                    this.singleSkillType.buckets.splice(Number(singleBucketIndex), 1);
                }
            }
            this.combineBucketsAndWeights();
        }
    }

    /**
    *
    */
    combineBucketsAndWeights() {
        if (this.bucketsAndWeights.length != 0) {
            for (let index in this.bucketsAndWeights) {
                this.singleSkillType.weights[index] = this.bucketsAndWeights[index].weights;
            }
        }
        this.bucketsAndWeights = [];
        for (let index in this.singleSkillType.buckets) {
            this.bucketsAndWeights.push({ "bucketCategory": this.singleSkillType.buckets[index].bucketCategory, "weights": this.singleSkillType.weights[index] });
        }
    }

    checkMinMax(index: number) {
        if (this.bucketsAndWeights[index].weights > 100) {
            this.bucketsAndWeights[index].weights = 100;
        } else if (this.bucketsAndWeights[index].weights < 0) {
            this.bucketsAndWeights[index].weights = 0;
        }
    }

    updateSkillType(modal: SkillType) {
        this.skillType = modal;
        this.skillType.skillTypeId = this.singleSkillType.skillTypeId;
        let addedBucket = false;
        this.bucketWeightSum = 0;
        if (this.bucketsAndWeights) {
            for (let index in this.bucketsAndWeights) {
                addedBucket = true;
                this.bucketWeightSum += this.bucketsAndWeights[index].weights;
            }
        }
        if (this.bucketWeightSum == 100 || this.bucketsAndWeights.length == 0) {
            this.modalServiceRef.close();
            let bucketsId = [];
            let weights = [];
            for (let index in this.bucketsAndWeights) {
                bucketsId.push(this.singleSkillTypeBucketIds[index]);
                weights.push(this.bucketsAndWeights[index].weights);
            }
            this.skillTypeService.updateSkillTypeBuckets(this.skillType, bucketsId, weights).subscribe();
            this.grabAllSkillTypes()
            this.savedSuccessfully();
        }
        else {
            this.error = true;
        }

        
    }


    createNewSkillType(modal: SkillType) {
        this.skillType = modal;
        this.skillTypeService.createSkillType(this.skillType).subscribe(results => {
            this.grabAllSkillTypes();
        })
        this.savedSuccessfully();
    }

    checkBucketSum() {
        this.bucketWeightSum = 0;
        for (let bucket of this.bucketsAndWeights) {
            this.bucketWeightSum += bucket.weights;
        }
        if (this.bucketWeightSum == 100) {
            this.error = false;
        } else {
            this.error = true;
        }
    }

    grabAllSkillTypes() {
        this.skillTypeService.getSkillTypes().subscribe(results => {
            this.allSkillTypes = results;
            this.setSkillTypes();
        });
    }

    grabAllBuckets() {
        this.bucketsService.getAllBuckets().subscribe(results => {
            this.allBuckets = results;
        })
    }

    resetFields() {
        this.singleSkillType = null;
        this.bucketsAndWeights = [];
        this.error = false;
        this.singleSkillTypeBucketIds = [];
    }

    savedSuccessfully() {
        this.alertsService.success("Saved successfully");
    }

    ngOnInit() {
        this.grabAllSkillTypes();
        this.grabAllBuckets();

        if (this.bucketsService.routingToAllBuckets == true) {

            this.bucketsService.routingToAllBuckets = false;
            if (this.tab.activeId === "tab-1") {
                this.tab.select("tab-2");
            }
             //this.tab.activeId = "tab-2";
        }
    }

}
