import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';

@Component({
  selector: 'app-batches-timeline-filter',
  templateUrl: './batches-timeline-filter.component.html',
  styleUrls: ['./batches-timeline-filter.component.css']
})
export class BatchesTimelineFilterComponent implements OnInit {
  constructor(
    private curriculumControllerService: CurriculumControllerService,
    private focusControllerService: FocusControllerService,
    private addressControllerService: AddressControllerService,
    private roomControllerService: RoomControllerService,
    private buildingControllerService: BuildingControllerService
  ) {}

  @Input() loading = false;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() curriculumFilter = 'Any';
  @Input() focusFilter = 'Any';
  @Input() locationFilter = 'Any';
  @Input() buildingFilter = 'Any';
  @Input() hideConcludedBatches: boolean;
  @Input() hideBatchlessTrainers: boolean;
  @Input() hideInactiveTrainers: boolean;
  @Input() trainersPerPage: number;
  @Input() currentPage: number;
  @Input() maxPages: number;

  private DEFAULT_PRECEEDING_MONTHS = 3;
  private DEFAULT_PROCEEDING_MONTHS = 6;

  @Output() public filterChangeEmitter = new EventEmitter<Event>();

  public curriculumData = ['Any', '.NET', 'Java', 'SDET', 'Custom'];

  public focusData = ['Any', 'Appian', 'Capitol One', 'Big Data'];

  public locationData = ['Revature HQ', 'Tempe', 'New York City'];

  public buildingData = ['Any', '11730 Plaza Drive'];

  loadStartDate() {
    const preceedingDate = new Date();
    preceedingDate.setMonth(preceedingDate.getMonth() - this.DEFAULT_PRECEEDING_MONTHS);
    this.startDate = preceedingDate;
    console.log(this.startDate);
  }

  loadEndDate() {
    const proceedingDate = new Date();
    proceedingDate.setMonth(proceedingDate.getMonth() + this.DEFAULT_PROCEEDING_MONTHS);
    this.endDate = proceedingDate;
    console.log(this.endDate);
  }

  loadCurriculumData() {
    this.loading = true;
    this.curriculumControllerService.findAll().subscribe(result => {
      this.curriculumData = [];
      this.curriculumData.push('Any');
      for (let i = 0; i < result.length; i++) {
        const curriculum = result[i];
        const value = curriculum.name;
        if (value != null) {
          this.curriculumData.push(value);
        }
      }
      this.curriculumFilter = 'Any';
      this.loading = false;
    });
  }

  loadFocusData() {
    this.loading = true;
    this.focusControllerService.findAll().subscribe(result => {
      this.focusData = [];
      this.focusData.push('Any');
      for (let i = 0; i < result.length; i++) {
        const focus = result[i];
        const value = focus.name;
        if (value != null) {
          this.focusData.push(value);
        }
      }
      this.focusFilter = 'Any';
      this.loading = false;
    });
  }

  loadLocationData() {
    this.loading = true;
    this.addressControllerService.findAll().subscribe(result => {
      this.locationData = [];
      this.locationData.push('Any');
      for (let i = 0; i < result.length; i++) {
        const location = result[i];
        const value = location.name;
        if (value != null) {
          this.locationData.push(value);
        }
      }
      this.locationFilter = 'Any';
      this.loading = false;
    });
  }

  loadBuildingData() {
    this.loading = true;
    this.buildingControllerService.findAll().subscribe(result => {
      this.buildingData = [];
      this.buildingData.push('Any');
      // for (let i = 0; i < result.length; i++) {
      //   const location = result[i];
      //   for (let j = 0; j < result.length; j++) {
      //     const building = result[j];
      //     const value = building.name;
      //     if (value != null) {
      //       this.buildingData.push(value);
      //     }
      //   }
      // }
      this.buildingFilter = 'Any';
      this.loading = false;
    });
  }

  onFilterChange(evt: Event) {
    this.filterChangeEmitter.emit(evt);
  }

  ngOnInit() {
    this.loadStartDate();
    this.loadEndDate();
  }
}
