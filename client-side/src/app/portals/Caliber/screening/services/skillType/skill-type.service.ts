import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { SkillType } from "../../entities/skillType";
import { SKILLTYPES } from "../../mock-data/mock-skillTypes";

@Injectable()
export class SkillTypeService {
  private ROOT_URL: string = "http://localhost:8080/skillType";
  private candidateSkillType: Observable<SkillType>;
  constructor(private httpClient: HttpClient) {}
  
  getSkillTypes(): Observable<SkillType[]> {
    return of(SKILLTYPES);
  }

  // getSkillTypes(): Observable<SkillType[]> {
  //   return this.httpClient.get<SkillType[]>(this.ROOT_URL + "/all.json");
  // }
}
