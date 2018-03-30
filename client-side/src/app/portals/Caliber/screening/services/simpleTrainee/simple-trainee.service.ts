import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { SimpleTrainee } from '../../entities/simpleTrainee';
import { TRAINEES } from '../../mock-data/mock-simpleTrainees';
import { UrlUtilService } from '../UrlUtil/url-util.service';
import { SkillTypeService } from "../../services/skillType/skill-type.service";

/*
Used to obtain the collection of 
candidates waiting to be screened, 
set the candidate being screened, 
and get the candidate being screened
*/
@Injectable()
export class SimpleTraineeService {

  constructor(
    private httpClient: HttpClient,
    private urlUtilService: UrlUtilService,
    private skillTypeService: SkillTypeService,
  ) { }

  // Need to change to match the backend
  private ROOT_URL: string = this.urlUtilService.getBase() + '/trainee-service';

  selectedCandidate: SimpleTrainee;

  // Set the current selected candidate to the candidate input
  setSelectedCandidate(candidate: SimpleTrainee): void {
    this.selectedCandidate = candidate;
  }

  // Return the current selected candidate
  getSelectedCandidate(): SimpleTrainee{
    return this.selectedCandidate;
  }

  // Get an Observable array of all simple trainees.
  getSimpleTrainees(): Observable<SimpleTrainee[]> {
    let allSimpleTrainees: SimpleTrainee[] = [];
    // Get array of skillTypeIds, apply random skillTypeId's to each new SimpleTrainee
    this.skillTypeService.getSkillTypes().subscribe(allSkillTypes => {
      // Get array of HYDRA simpleTrainees, use info to build array of simpleTrainees
      this.httpClient.get<any[]>(this.ROOT_URL + '/all/trainee/getAll/').subscribe(allCandidates => {
        console.log(allCandidates);
        for (let e of allCandidates) {
          // Each simpleTrainee get random skillType
          let randomSkillTypeIndex = Math.floor(Math.random() * allSkillTypes.length);
          let thisSkillTypeId = allSkillTypes[randomSkillTypeIndex].skillTypeId;
          let thisSkillTypeName = allSkillTypes[randomSkillTypeIndex].skillTypeName;
          // Parse name into first and last name
          let nameArray = e.name.split(" ");
          let thisLastName: string = '';
          let thisFirstName: string = '';
          let i = 0;
          let commaFound: boolean = false;
          for (let n of nameArray) {
            if (n.charAt(n.length-1) == ',') {
              commaFound = true;
              for (let j = 0; j <= i; j++) {
                // Add spaces between multiple lastnames
                thisLastName += nameArray[j] + " ";
              }
              // Remove last space, and comma
              thisLastName = thisLastName.trim();
              thisLastName = thisLastName.substring(0, thisLastName.length-1);
              for (let j = i+1; j <= nameArray.length-1; j++) {
                thisFirstName += nameArray[j] + " ";
              }
              thisFirstName = thisFirstName.trim();
            }
            i++;
          }
          if (!commaFound) {
            thisFirstName = nameArray[0];
            for (i = 1; i < nameArray.length; i++) {
              thisLastName += nameArray[i] + " ";
            }
            thisLastName = thisLastName.trim();
          }
          
          allSimpleTrainees.push({
            traineeID: e.traineeId,
            firstname: thisFirstName,
            lastname: thisLastName,
            skillTypeID: thisSkillTypeId,
            skillTypeName: thisSkillTypeName,
            schedule: new Date()
          })
        }
      });
    });
    
    return of(allSimpleTrainees);
  }
  
}
