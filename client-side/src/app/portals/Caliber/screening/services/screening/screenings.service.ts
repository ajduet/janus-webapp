import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Screening } from "../../entities/screening";

@Injectable()
export class ScreeningService {
  constructor(private httpClient: HttpClient) {}

  // Need to change to match the backend
  private ROOT_URL: string = "http://localhost:8080/screening";
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
}