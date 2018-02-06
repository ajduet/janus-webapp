import { Component, OnInit } from '@angular/core';
import { TopicName } from '../../../models/topicname.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { CurriculumService } from '../../../services/curriculum.service';
import { ViewChild } from '@angular/core/src/metadata/di';
import { DragNDropDirective } from '../../../drag-n-drop.directive';
import { CurriculumWeekComponent } from '../curriculum-week/curriculum-week.component';


@Component({
  selector: 'app-topic-pool',
  templateUrl: './topic-pool.component.html',
  styleUrls: ['./topic-pool.component.css']
})

export class TopicPoolComponent implements OnInit {
  topics: string[] = [];
  uniqarr: string[];
  subArray: Array<SubtopicName[]> = new Array<SubtopicName[]>();
  subTopicName: SubtopicName[];
  constructor(private curriculumService: CurriculumService,
              public curriculumWeekComponent: CurriculumWeekComponent) { }





  currentlyDragged;

  /**  On initializing this component we are calling the getTopic() function
   *   @author: Mohamad Alhindi
    *  @batch: 1712-Dec11-2017
    *  */
  ngOnInit() {
    this.getTopics();
  }

  /**  This will subscribe to the curriculum service to obtain the topic pool information
   *   @author: Mohamad Alhindi
    *  @batch: 1712-Dec11-2017
    */
  getTopics() {
    this.curriculumService.getAllTopicPool().subscribe(
      data => {
        this.subTopicName = data;
        this.initTopics();
        this.uniqueTopics();
        this.getSubTopics();
      },
      err => {
        console.log(err.status);
      }
    );
  }

    /** Runs throught subTopicNames array and will extract the topics within the array
     *  @author: Mohamad Alhindi
      * @batch: 1712-Dec11-2017
      */
  initTopics() {
    for (let i = 0; i < this.subTopicName.length; i++) {
      this.topics.push(this.subTopicName[i].topic.name);
    }
  }

  /** This method is used with conjunction of filter to obtain only unique elements of an array
    * @author: Mohamad Alhindi
      @param: value
      @param: index
      @param: self
    * @batch: 1712-Dec11-2017
    */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  /**  Filters through topics array to filter out repeated topics within the array
   *   @author: Mohamad Alhindi
    *  @batch: 1712-Dec11-2017
    */
  uniqueTopics() {
    this.uniqarr = this.topics.filter(this.onlyUnique);
  }

  /** Uses the unique topics array to obtain the the subtopics that releate to each topic
    * @author: Mohamad Alhindi
    * @batch: 1712-Dec11-2017
    */
  getSubTopics() {
    for (let i = 0; i < this.uniqarr.length; i++) {
      this.subArray.push(this.subTopicName.filter(e => this.uniqarr[i] === e.topic.name));
    }
  }

   dragStart(event) {
    this.currentlyDragged = event;
    this.curriculumWeekComponent.draggedFinder(this.currentlyDragged);
  }
    

  /* dragOver() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory();
    const viewContainerRef = ;
    const componentRef = viewContainerRef.remove();
  } */
}
