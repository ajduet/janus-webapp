import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Screening } from "../../entities/screening";
import { UrlUtilService } from '../UrlUtil/url-util.service';

@Injectable()
export class ScreeningService {
  constructor(private httpClient: HttpClient,
    private urlUtilService: UrlUtilService) {}

  // Need to change to match the backend
  private ROOT_URL: string = this.urlUtilService.getBase() + "/screening";
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });

  public softSkillsResult: string;
  public generalComments: string;
  public screeningID$: Observable<Screening>;
  compositeScore: number;
  finalSoftSkillComment: string;
  retrieveScreening(): Observable<Screening> {
    this.screeningID$ = this.httpClient.post<Screening>("", {});
    return this.screeningID$;
  }

  beginScreening(
    traineeID: number,
    beginTime: Date,
    trainerID: number,
    skillTypeID: number
  ): Observable<Screening> {
    this.screeningID$ = this.httpClient
      .post<Screening>(
        this.ROOT_URL + "/all/trainee.json",
        JSON.stringify(
          Object.assign({}, traineeID, beginTime, trainerID, skillTypeID)
        ),
        { headers: this.headers }
      );
    return this.screeningID$;
  }

  getScreeningID() {
    return this.screeningID$;
  }

  endScreening(softSkillComment: string, ): void {
    let screeningId: number;
    this.screeningID$.subscribe(data => screeningId = screeningId);
    this.httpClient.post(this.ROOT_URL + '/screening-service/screening/end', Object.assign({}, "complete", this.convertToBoolean(this.softSkillsResult), this.finalSoftSkillComment, new Date(), screeningId, this.compositeScore))
  }

  convertToBoolean(input: string): boolean | undefined {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return undefined;
    }
}
}
