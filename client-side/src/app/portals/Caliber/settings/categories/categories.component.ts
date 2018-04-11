import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// services
import { environment } from '../../../../../environments/environment';

// entities
import { Category } from '../../entities/Category';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HydraSkill } from '../../../../hydra-client/entities/HydraSkill';
import { HydraSkillService } from '../../../../hydra-client/services/skill/hydra-skill.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  newCategory: HydraSkill = {
    skillId: 0,
    skill: '',
    active: true
  };

  addForm: FormGroup;

  categories: HydraSkill[];
  currentCategory: HydraSkill;

  columns;
  numColumns: number;
  constructor(private modalService: NgbModal, private hydraSkillService: HydraSkillService, private fb: FormBuilder) {
  }

  /**
   * Loads all Categories
   * @memberof CategoriesComponent
   */
  ngOnInit() {
    this.initFormControl();
    this.hydraSkillService.findAll().subscribe((resp) => {
      this.categories = resp;
      this.numColumns = this.categories.length / 8 + 1;
      if (this.numColumns > 3) {
        this.numColumns = 3;
      }
      this.columns = Array.apply(null, { length: this.numColumns }).map(Number.call, Number);
    });
  }

  resetFormControl() {
    this.addForm = this.fb.group({
      'name': ['', Validators.required]
    });
  }
  initFormControl() {
    this.addForm = this.fb.group({
      'name': [this.newCategory.skill, Validators.required]
    });
  }

  /**
   * Adds a new Category
   * @param {any} value
   * @memberof CategoriesComponent
   */
  addNewCategory(value) {
    this.newCategory.skill = value.name;
    this.newCategory.active = true;
    this.hydraSkillService.save(this.newCategory).subscribe((succ) => {
      this.categories.push(succ);
    });
    // may not need this statement without all of the inherited subjects
    this.resetFormControl();
  }

  /**
   * Send call to update active status
   * @param {any} nameChange
   * @memberof CategoriesComponent
   */
  editCurrentCategory(nameChange) {
    this.hydraSkillService.update(this.currentCategory).subscribe((resp) => {
      this.categories.some( cat => {
        if (cat.skillId === resp.skillId) {
          cat = resp;
          return true;
        }
      });
    });

  }

  /**
   * Populates the Columns with Categories
   * @param {any} column
   * @param {any} index
   * @returns
   * @memberof CategoriesComponent
   */
  nextColumn(column, index) {
    switch (column) {
      case 0:
        if (index < this.categories.length / this.numColumns) {
          return true;
        }
        break;
      case 1:
        if (index > this.categories.length / this.numColumns) {
          // If the numbers of categories is 3 then this condition will activate
          if (this.numColumns === 3) {
            if (index < ((this.categories.length / this.numColumns) * 2)) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
        break;
      case 2:
        if (index > ((this.categories.length / this.numColumns) * 2)) {
          return true;
        } break;
      default:
        break;
    }
  }

  /**
   * Opens a Modal
   * @param {any} content
   * @memberof CategoriesComponent
   */
  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  /**
   * Open the edit modal
   * @param {any} content
   * @param {Category} index
   * @memberof CategoriesComponent
   */
  editopen(content, index: HydraSkill) {
    this.currentCategory = JSON.parse(JSON.stringify(index)); // essentially clone the object, there may be a better way
    this.modalService.open(content);
  }
}
