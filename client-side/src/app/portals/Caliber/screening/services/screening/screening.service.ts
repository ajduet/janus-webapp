import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Screening } from "../../entities/screening";
import { UrlUtilService } from '../UrlUtil/url-util.service';
import { ScheduledScreening } from "../../entities/scheduleScreening";

/*
 * A service that contains all functions used for overall screening management
 * and comment submission.
 */
@Injectable()
export class ScreeningService {
  constructor(private httpClient: HttpClient,
    private urlUtilService: UrlUtilService) {}

  // Need to change to match the backend
  private ROOT_URL: string = this.urlUtilService.getBase();
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });

  public softSkillsResult: string;
  public generalComments: string;
  public screeningID$: Observable<Screening>;
  compositeScore: number;
  finalSoftSkillComment: string;


  // When the screening begins, the following information will be sent,
  // and a screening ID will be returned as an observable.
  // scheduledScreening - the screening object selected from the screening list
  // beginTime - the start time of the screening
  // trainerId - ID of the trainer conducting the screening
  // skillTypeId - the ID of the track
  beginScreening(
    scheduledScreening: ScheduledScreening,
    beginTime: Date,
    trainerId: number,
    skillTypeId: number,
  ): Observable<Number> {
    return this.httpClient
      .post<Number>(
        this.ROOT_URL + "/screening-service/screening/start",
        { 
          "scheduledScreening": scheduledScreening.scheduledScreeningId,
          "beginTime" : beginTime,
          "trainerId" : trainerId,
          "skillTypeId" : skillTypeId 
        },
        { headers: this.headers }
      );
  }

  // Getter method for the screeningID$ observable
  getScreeningID() {
    return this.screeningID$;
  }

  // When the screening ends, send the appropriate information via POST request.
  // softSkillComment - the screener's final comments on the candidate's soft skills.
  endScreening(softSkillComment: string): void {
    let verdict;
    if(this.softSkillsResult === "Pass"){
      verdict = 1;
    } else if (this.softSkillsResult === "Fail"){
      verdict = 0;
    }
    this.httpClient.post(this.ROOT_URL + '/screening-service/screening/end',
      {
        "status" : "Completed", 
        "softSkillVerdict" : verdict, 
        "softSkillCommentary" : this.finalSoftSkillComment, 
        "endDateTime" : new Date(), 
        "screeningId" : localStorage.getItem("screeningID"), 
        "scheduledScreeningId" : localStorage.getItem("scheduledScreeningID"),
        "compositeScore" : this.compositeScore
      }
    ).subscribe();
  }

  // Helper method that converts an input string to a boolean
  convertToBoolean(input: string): boolean | undefined {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return undefined;
    }
  }

  // Submit comments related to the candidate's self-introduction
  // From the IntroductionComponent
  // comment - the screener's comment
  submitIntroComment(comment : string) {
    this.httpClient.post<String>(
      this.ROOT_URL + "/screening-service/screening/introcomment",
      { traineeId : localStorage.getItem("screeningID"), softSkillCommentary : comment }
    ).subscribe();
  }

  // Submits general comments related to the candidate's overall performance
  // through the Q&A portion.
  submitGeneralComment() {
    this.httpClient.post<String>(
      this.ROOT_URL + "/screening-service/screening/generalcomment",
      { comment : this.generalComments, screeningId : localStorage.getItem("screeningID")}
    ).subscribe();
  }
}
