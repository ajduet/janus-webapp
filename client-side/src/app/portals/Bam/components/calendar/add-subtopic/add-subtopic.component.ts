import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { CalendarService } from '../../../services/calendar.service';
import { SubtopicType } from '../../../models/subtopictype.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { SubtopicStatus } from '../../../models/subtopicstatus.model';
import { TopicName } from '../../../models/topicname.model';
import { Batch } from '../../../models/batch.model';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subtopic } from '../../../models/subtopic.model';
import { AddSubtopicService } from '../../../services/add-subtopic.service';

//for jquery
declare var $: any;
var selectedSubtopic;

@Component({
  selector: 'app-add-subtopic',
  templateUrl: './add-subtopic.component.html',
  styleUrls: ['./add-subtopic.component.css']
})
/**
 * This features allows a user to select a subtopic to
 * add to their calendar. Subtopics cannot be repeated
 * on a batch. If a user tries to add a subtopic that
 * exists on the current batch, a pop up modal will appear
 * to notify the user it exists on their calendar. This modal
 * will give the user the opportunity to override the previous
 * date with the one they have selected.
 * @author Francisco Palomino | Batch: 1712-dec10-java-steve
 */
export class AddSubtopicComponent implements OnInit {

  @ViewChild('content') modalRef: TemplateRef<any>;
  public loading: Boolean = true;
  public closeResult: string;

  public subtopics: SubtopicName[] = [];
  public currentlyAddedSubtopic: Subtopic[] = [];

  public uniqueTopics = new Set();
  public topicMap = new Map();
  public subtopicList: Object[] = [];
  public selectedTopic: string;
  public selectedSubtopic: string;
  public selectedDate: any;

  public prevDate: string;
  public newDate: any;

  private topicId: number;
  private subtopicId: number;

  public currentBatch: Batch;
  private batchSubtopics: Subtopic[] = [];

  private topicName: TopicName;
  private subtopicType: SubtopicType;
  private subtopicName: SubtopicName;
  private status: SubtopicStatus;
  private subtopic: Subtopic;
  private slectedDateMiliseconds: any;

  private _alert: Subject<string> = new Subject<string>();
  private _alertSuccess: Subject<string> = new Subject<string>();

  public alertMessage: string;
  public successMessage: string;

  constructor(private subtopicsService: AddSubtopicService,
    private modalService: NgbModal, private calendarService: CalendarService) { }

  ngOnInit() {
    this.selectedTopic = 'Select a Topic';
    this.selectedSubtopic = 'Select a Subtopic';
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);

    this._alertSuccess.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._alertSuccess, 5000).subscribe(() => this.successMessage = null);

    this.subtopicsService.getSubtopicPool().subscribe(
      (subtopicsService) => {
        this.getCurrentBatch();
        this.subtopics = this.getSubtopics(subtopicsService);
      }
    );
  }

  /**
    * Loads current batch information and all the subtopics of the batch
		*	@author Francisco Palomino | Batch: 1712-dec10-java-steve
		*/
  getCurrentBatch() {
    this.subtopicsService.getBatchById().subscribe(
      (service) => {
        this.currentBatch = service;
      }
    );
    this.subtopicsService.getBatchSubtopics().subscribe(
      service => {
        this.batchSubtopics = service;
      });
  }
  /**
    * The endpoint used returns the subtopics with their topic.
    * The following iterations creates a set of unique Topics to filter
    * out the topics from the Subtopics List and maps them to the 'topicMap' property.
    * The loading property is set to false here beacuse once this method is called
    * All the subtopics have been loaded
    *	@author Francisco Palomino | Batch: 1712-dec10-java-steve
    * @param subtopics holds the subtopics result from the database call
		*/
  getSubtopics(subtopics) {
    for (let i in subtopics) {
      if (!this.uniqueTopics.has(subtopics[i].topic.name)) {
        this.uniqueTopics.add(subtopics[i].topic.name);
        let array = [];
        array.push(subtopics[i].name);
        this.topicMap.set(subtopics[i].topic.name, array);
      } else {
        let array = this.topicMap.get(subtopics[i].topic.name);
        this.topicMap.delete(subtopics[i].topic.name);
        array.push(subtopics[i].name);
        this.topicMap.set(subtopics[i].topic.name, array);
      }
    }
    this.loading = false;
    return subtopics;
  }
  /**
   * Method called when a topic is changed. It generates the subtopic list
   * of the current Topic selected and sorts them alphabetically
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  onChangeLoadSubtopics() {
    this.subtopicList = [];
    this.selectedSubtopic = 'Select a Subtopic';
    if (this.selectedTopic !== '' && this.selectedTopic !== 'Select a Topic') {
      for (let subtopic of Array.from(this.topicMap.get(this.selectedTopic))) {
        this.subtopicList.push(subtopic);
      }
    }
    this.subtopicList.sort((n1, n2) => {
      if (n1 > n2) {
        return 1;
      }
      if (n1 < n2) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Method is called once the subtopic list is changed which
   * obtains all the necessary properties of the subtopic to be
   * able to persist it to the database
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  onChangeGetSubtopicInfo() {
    if (this.selectedSubtopic !== '' && this.selectedSubtopic !== 'Select a Subtopic') {
      for (let i in this.subtopics) {
        if (this.selectedSubtopic === this.subtopics[i].name) {
          this.topicId = this.subtopics[i].topic.id;
          this.subtopicId = this.subtopics[i].id;
          this.subtopicType = {
            id: this.subtopics[i].type.id,
            name: this.subtopics[i].type.name
          };
        }
      }
    }
  }

  setDraggableOnSubtopic(event) {
    $(event.target).draggable(
      {
        revert: true,
        revertDuration: 200,
        zIndex: 999,
        scroll: false,
        helper: "clone",

        start: function() {
          $(this).data = {}
        }
      }
    );
  }
  /**
   * Method verifies selection inputs and the date and sends the appropriate
   * message to the user if something is missing or incorrect. Once all validation
   * is successfull it persists the new subtopic to the database
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  saveSubtopic() {
    this.slectedDateMiliseconds = new Date(this.selectedDate).setHours(0, 0, 0, 0);
    this.slectedDateMiliseconds += 1000 * 60 * 60 * 24;

    if (this.selectedTopic === 'Select a Topic' || this.selectedSubtopic === 'Select a Subtopic'
      || this.selectedTopic === '' || this.selectedSubtopic === '') {
      this.changeAlertMessage(`Select topic and subtopic`);
    } else if (isNaN(this.slectedDateMiliseconds)) {
      this.changeAlertMessage(`Date input error.`);
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      if (this.slectedDateMiliseconds >= today) {
        this.status = {
          id: 1,
          name: 'Pending'
        };
      } else {
        this.status = {
          id: 4,
          name: 'Missed'
        };
      }
      this.setSubtopicObject();
      if (this.checkSubtopics()) {
        this.subtopicsService.addSubtopic(this.subtopic).subscribe(
          (service) => {
            let arr = [];
            this.batchSubtopics.push(service);
            this.currentlyAddedSubtopic.push(service);
            this.changeSuccessMessage(`Successfully added!`);
            this.calendarService.addSubtopicToCalendar(service);
          }, error => this.changeAlertMessage(`Failed to add Subtopic, check all inputs`)
        );
      } else {
        this.open(this.modalRef);
      }
    }
  }
  /**
   * Verifies if the subtopic being added to the calendar currently
   * exists on the batch's calendar. If the calendar does have the
   * the subtopic it saves its properties just in case the
   * user wants to override the date.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @return I used the false value to idenetify that it can't be
   * added because it exists on the current batch.
   */
  checkSubtopics() {
    for (let i = 0; i < this.batchSubtopics.length; i++) {
      if (this.subtopic.subtopicName.name === this.batchSubtopics[i].subtopicName.name) {
        const date = new Date(this.batchSubtopics[i].subtopicDate);
        this.newDate = new Date(this.slectedDateMiliseconds);
        this.newDate = this.newDate.toDateString();
        this.prevDate = date.toDateString();
        this.subtopicId = this.batchSubtopics[i].subtopicId;
        return false;
      }
    }
    return true;
  }

  /**
   * Calls the error alert message
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param message holds the message that will be displayed
   */
  changeAlertMessage(message) {
    this._alert.next(message);
  }

  /**
   * Calls the success alert message
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param message holds the message that will be displayed
   */
  changeSuccessMessage(message) {
    this._alertSuccess.next(message);
  }

  /**
   * Creates the subtopic object based on all the selected
   * values to be persisted to the database
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  setSubtopicObject() {
    this.topicName = {
      id: this.topicId,
      name: this.selectedTopic,
    };
    this.subtopicName = {
      id: this.subtopicId,
      name: this.selectedSubtopic,
      topic: this.topicName,
      type: this.subtopicType
    };
    this.subtopic = {
      subtopicId: null,
      subtopicName: this.subtopicName,
      batch: this.currentBatch,
      status: this.status,
      subtopicDate: this.slectedDateMiliseconds
    };
  }
  /**
   * Opens a modal to ask the user if they would like to reset
   * the date of a subtopic currently in their calendar. It allows the user
   * to cancel or save the new change.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param content HTML element reference of the modal
   */
  open(content) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'ok') {
          this.subtopic.subtopicId = this.subtopicId;
          this.calendarService.addSubtopicToCalendar(this.subtopic);
          this.subtopicsService.updateDate(this.subtopicId, 22506, this.slectedDateMiliseconds).subscribe(
            () => {
              this.changeSuccessMessage(`Successfully updated!`);
              for (let i = 0; i < this.batchSubtopics.length; i++) {
                if (this.batchSubtopics[i].subtopicId === this.subtopicId) {
                  this.batchSubtopics[i].subtopicDate = this.slectedDateMiliseconds;
                }
              }
            },
            response => {
              if (response.status = 200) {
                this.changeSuccessMessage(`Successfully updated!`);
              } else {
                this.changeAlertMessage(`Failed to add Subtopic, verify all inputs`);
              }
            }
          );
        }
      }, (reason) => { });
  }

  selectSubtopic(subtopic: Subtopic) {
    if(selectedSubtopic != undefined) {
      $(selectedSubtopic).css('opacity', 1);
    }
    selectedSubtopic = event.target;
    $(selectedSubtopic).css('opacity', 0.5);
    //this.selectedSubtopic = subtopic.subtopicName.name;
    console.log(subtopic);
  }
}
