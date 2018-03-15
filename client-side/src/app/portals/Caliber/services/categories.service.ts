import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../../environments/environment';
import { SkillsService } from './category.service';


// entities
import { Skill } from '../entities/Category';
import { AlertsService } from './alerts.service';

/**
* @deprecated
*
* @see CategoryService
*
* this service manages calls to the web services
* for Category objects
*/
@Injectable()
export class CategoriesService extends SkillsService {

  constructor(httpClient: HttpClient, alertService: AlertsService) {
    super(httpClient, alertService);

    this.getAll();
  }

  public getAll(): void {
    super.fetchAll();
  }

  // adds a new category to the database
  public addNewCategory(category: Skill): void {
    super.create(category);
  }

  public editCurrentCategory(category: Skill): void {
    super.update(category);
  }
}
