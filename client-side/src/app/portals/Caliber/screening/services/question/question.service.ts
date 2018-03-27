import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Entities
import { Question } from "../../entities/question";
import { Tag } from "../../entities/tag";
import { QUESTIONS } from "../../mock-data/mock-questions";

// Services
import { TagService } from "../../services/tag/tag.service";
import { SimpleTraineeService } from "../simpleTrainee/simple-trainee.service";
import { UrlUtilService } from '../UrlUtil/url-util.service';
/*
Provides an observable of Questions through the getQuestions() method.
*/
@Injectable()
export class QuestionService {
  
  constructor(
    private httpClient: HttpClient,
    private tagService: TagService,
    private simpleTraineeService: SimpleTraineeService,
    private urlUtilService: UrlUtilService
  ) {}

  private ROOT_URL: string = this.urlUtilService.getBase() + "/question";
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });

  getQuestions(): Observable<Question[]> {
    return of(QUESTIONS);
  }

  // getQuestions(): Observable<Question[]> {
  //   return this.httpClient.post<Question[]>(
  //     this.ROOT_URL + "/filtered.json",
  //     JSON.stringify(
  //       Object.assign(
  //         {},
  //         this.tagService.getCheckedTags(),
  //         this.simpleTraineeService.getSelectedCandidate()
  //       )
  //     ),
  //     { headers: this.headers }
  //   );
  // }
}
