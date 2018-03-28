import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { ScheduleScreening } from "../../entities/scheduleScreening";
import { UrlUtilService } from "../UrlUtil/url-util.service";

@Injectable()
export class ScheduleScreeningService {
  constructor(
    private httpClient: HttpClient,
    private urlUtilService: UrlUtilService
  ) {}

  getScheduleScreenings(): Observable<ScheduleScreening[]> {
    return this.httpClient.get<ScheduleScreening[]>(
      this.urlUtilService.getBase() + "REPLACE THIS WITH THE ACTUAL ENDPOINT PORTION.json"
    );
  }
}
