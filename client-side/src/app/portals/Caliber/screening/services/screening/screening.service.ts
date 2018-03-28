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
  private ROOT_URL: string = this.urlUtilService.getBase();
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });

  public softSkillsResult: string;
  public generalComments: string;
  public screeningID$: Observable<Screening>;

  retrieveScreening(): Observable<Screening> {
    this.screeningID$ = this.httpClient.post<Screening>("", {});
    return this.screeningID$;
  }

  beginScreening(
    traineeId: number,
    beginTime: Date,
    trainerId: number,
    skillTypeId: number
  ): Observable<Number> {
    return this.httpClient
      .post<Number>(
        this.ROOT_URL + "/screening-service/screening/start",
        { traineeId : traineeId, beginTime : beginTime, trainerId : trainerId, skillTypeId : skillTypeId },
        { headers: this.headers }
      );
  }

  getScreeningID() {
    return this.screeningID$;
  }
}
