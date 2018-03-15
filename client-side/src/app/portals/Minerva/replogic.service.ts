import { Injectable } from '@angular/core';
import { Element } from './reports/Form-Months';
import { Monthlist } from './reports/rep Interface';
import { BatchService } from './services/batch.service';
import { CurriculaService } from './services/curricula.service';
import { Curriculum } from './domain/curriculum';
import { ifTrue } from 'codelyzer/util/function';
import { Batch } from './domain/batch';
import { GlobalSettings } from './domain/global-settings';
import { SettingsService } from './services/global-settings.service';
import { DatePipe } from '@angular/common';


@Injectable()
export class ReplogicService {
  months: Monthlist[];
  ELEMENT_DATA: Element[];
  Trainer_Element: Element[];
  gm: Monthlist[];

  month = 'September';
  i: number;
  curricula: Curriculum[];
  batch: Batch[];
  setting: GlobalSettings[] = [];
  date_parer: string;
  reportGrads = 13;
  reportIncomingGrads = 18;
  constructor(private circ: CurriculaService, private batchservice: BatchService, private settingService: SettingsService) {
    this.getAllBatches();
    this.getDefaultSetting();
    this.getElement();

    // Creates blank objects for other functions to populate
    for (; this.months.push({ name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }) < 19;) { }

    // Copy for a similar but different use
    this.gm = Array.from(this.months);

    // Populate blank object for method.
    for (; this.ELEMENT_DATA.push(
      {
        Curriculum: '',
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0
      }) < 19;) { }

    // Similar idea to above. Copied for similar but different use.
    this.Trainer_Element = Array.from(this.ELEMENT_DATA);
  }

  getElement() {
    this.circ.getAll().subscribe(circula => {
      this.curricula = circula;
      this.batchservice.getAll().subscribe(batch => {
        this.batch = batch;
        this.settingService.getSettings().subscribe(
          setting => {
            this.setting = setting;
            this.reportIncomingGrads = this.setting[0].reportIncomingGrads;
            this.reportGrads = this.setting[0].reportGrads;


            for (const x of Object.keys(this.batch)) {
              this.batch[x].startDate = new Date(this.batch[x].startDate).getMonth();
              this.batch[x].endDate = new Date(this.batch[x].endDate);
            }
            let y = 0;
            const test = true;
            for (let x = 0; x < this.curricula.length; x++) {
              if (this.curricula[x].core) {
                this.ELEMENT_DATA[y].Curriculum = this.curricula[x].name;
                y++;
                for (let z = 0; z < batch.length; z++) {
                  if (this.curricula[x].currId === this.batch[z].curriculum) {
                    let count = 0;
                    const mt = y - 1;
                    for (let td = 0; td < batch.length; td++) {
                      switch (this.batch[td].endDate.getUTCMonth()) {
                        case 0:
                          count++;
                          this.ELEMENT_DATA[mt].january = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 1:
                          count++;
                          this.ELEMENT_DATA[mt].february = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 2:
                          count++;
                          this.ELEMENT_DATA[mt].march = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 3:
                          count++;
                          this.ELEMENT_DATA[mt].april = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 4:
                          count++;
                          this.ELEMENT_DATA[mt].may = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 5:
                          count++;
                          this.ELEMENT_DATA[y].june = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 6:
                          count++;
                          this.ELEMENT_DATA[mt].july = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 7:
                          count++;
                          this.ELEMENT_DATA[mt].august = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 8:
                          count++;
                          this.ELEMENT_DATA[mt].september = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 9:
                          count++;
                          this.ELEMENT_DATA[mt].october = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 10:
                          count++;
                          this.ELEMENT_DATA[mt].november = this.setting[0].reportIncomingGrads * count;
                          break;
                        case 11:
                          count++;
                          this.ELEMENT_DATA[mt].december = this.setting[0].reportIncomingGrads * count;
                          break;
                      }
                    }
                  }
                }
              }
            }
          });
      });
    });
    return this.ELEMENT_DATA;
  }

  getList() {
    for (let x = 0; x < this.ELEMENT_DATA.length; x++) {
      this.months[x].name = this.ELEMENT_DATA[x].Curriculum;
      this.months[x].data = [
        this.ELEMENT_DATA[x].january,
        this.ELEMENT_DATA[x].february,
        this.ELEMENT_DATA[x].march,
        this.ELEMENT_DATA[x].april,
        this.ELEMENT_DATA[x].may,
        this.ELEMENT_DATA[x].june,
        this.ELEMENT_DATA[x].july,
        this.ELEMENT_DATA[x].august,
        this.ELEMENT_DATA[x].september,
        this.ELEMENT_DATA[x].october,
        this.ELEMENT_DATA[x].november,
        this.ELEMENT_DATA[x].december
      ];
    }
    return this.months;
  }

  getTrainerElement() {
    this.circ.getAll().subscribe(circula => {
      this.curricula = circula;
      this.batchservice.getAll().subscribe(batch => {
        this.batch = batch;
        this.settingService.getSettings().subscribe(
          setting => {
            this.setting = setting;
            this.reportIncomingGrads = this.setting[0].reportIncomingGrads;
            this.reportGrads = this.setting[0].reportGrads;


            for (const x of Object.keys(this.batch)) {
              this.batch[x].startDate = new Date(this.batch[x].startDate).getMonth();
              this.batch[x].endDate = new Date(this.batch[x].endDate);
            }
            console.log(this.batch[0].endDate.getMonth());
            let y = 0;
            const test = true;
            for (let x = 0; x < this.curricula.length; x++) {
              if (this.curricula[x].core) {
                this.Trainer_Element[y].Curriculum = this.curricula[x].name;
                y++;
                for (let z = 0; z < batch.length; z++) {
                  if (this.curricula[x].currId === this.batch[z].curriculum) {
                    const mt = y - 1;
                    let january = 0;
                    let february = 0;
                    let march = 0;
                    let april = 0;
                    let may = 0;
                    let june = 0;
                    let july = 0;
                    let august = 0;
                    let september = 0;
                    let october = 0;
                    let november = 0;
                    let december = 0;
                    for (let td = 0; td < batch.length; td++) {
                      if (this.batch[z].endDate.getUTCMonth() === this.batch[td].endDate.getUTCMonth()
                        && this.batch[td].endDate.getUTCMonth() === 0) {
                        january += 1;
                        this.Trainer_Element[mt].january = this.setting[0].reportIncomingGrads * january;
                        console.log(this.Trainer_Element[mt].january);
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 1) {
                        february += 1;
                        this.Trainer_Element[mt].february = this.setting[0].reportIncomingGrads * february;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 2) {
                        march += 1;
                        this.Trainer_Element[mt].march = this.setting[0].reportIncomingGrads * march;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 3) {
                        april += 1;
                        this.Trainer_Element[mt].april = this.setting[0].reportIncomingGrads * april;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === this.batch[td].endDate.getUTCMonth()
                        && this.batch[td].endDate.getUTCMonth() === 4) {
                        may += 1;
                        this.Trainer_Element[mt].may = this.setting[0].reportIncomingGrads * (may + may);
                        console.log(td);
                      } if (this.batch[z].endDate.getUTCMonth() === 5) {
                        june += 1;
                        this.Trainer_Element[mt].june = this.setting[0].reportIncomingGrads * june;
                      } if (this.batch[z].endDate.getUTCMonth() === 6) {
                        july += 1;
                        this.Trainer_Element[mt].july = this.setting[0].reportIncomingGrads * july;
                      } if (this.batch[z].endDate.getUTCMonth() === 7) {
                        august += 1;
                        this.Trainer_Element[mt].august = this.setting[0].reportIncomingGrads * august;
                      } if (this.batch[z].endDate.getUTCMonth() === 8) {
                        september += 1;
                        this.Trainer_Element[mt].september = this.setting[0].reportIncomingGrads * september;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 9) {
                        october += 1;
                        this.Trainer_Element[mt].october = this.setting[0].reportGrads * october;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 10) {
                        november += 1;
                        this.Trainer_Element[mt].november = this.setting[0].reportGrads * november;
                      }
                      if (this.batch[z].endDate.getUTCMonth() === 11) {
                        december += 1;
                        this.Trainer_Element[mt].december = this.setting[0].reportGrads * december;
                      }
                    }
                  }
                }
              }
            }
          });
      });
    });
    return this.Trainer_Element;
  }

  getTrainerList() {
    for (let x = 0; x < this.Trainer_Element.length; x++) {
      this.gm[x].name = this.Trainer_Element[x].Curriculum;
      this.gm[x].data = [
        this.Trainer_Element[x].january,
        this.Trainer_Element[x].february,
        this.Trainer_Element[x].march,
        this.Trainer_Element[x].april,
        this.Trainer_Element[x].may,
        this.Trainer_Element[x].june,
        this.Trainer_Element[x].july,
        this.Trainer_Element[x].august,
        this.Trainer_Element[x].september,
        this.Trainer_Element[x].october,
        this.Trainer_Element[x].november,
        this.Trainer_Element[x].december
      ];
    }
    return this.gm;
  }

  getAllBatches() {
    this.batchservice.getAll().subscribe(batch => {
      this.batch = batch;
      for (const x of Object.keys(this.batch)) {
        this.batch[x].startDate = new Date(this.batch[x].startDate);
        this.batch[x].endDate = new Date(this.batch[x].endDate);
      } console.log(this.batch);
      console.log(this.batch[0].startDate.getUTCFullYear());
      console.log(this.batch[0].startDate.getUTCMonth(), this.batch[0].endDate.getUTCMonth());
      console.log(this.batch[1].startDate.getUTCMonth(), this.batch[1].endDate.getUTCMonth());
    });
  }

  getDefaultSetting() {
    this.settingService.getSettings().subscribe(
      setting => {
        this.setting = setting;
        this.reportIncomingGrads = this.setting[0].reportIncomingGrads;
        this.reportGrads = this.setting[0].reportGrads;

      }, err => console.log(err)
    );
  }













}
