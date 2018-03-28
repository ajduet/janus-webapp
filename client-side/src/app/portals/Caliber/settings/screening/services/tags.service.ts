import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Tag} from '../entities/Tag'

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class TagsService {
    tag: Tag;
    url: string = "https://hydra-gateway-service.cfapps.io/question-service/tag/";
    constructor(private http: HttpClient) { };
    getAllTags(){
      return this.http.get(this.url + "getAllTags");
    }
    getTagByQuestion(questionId : number){
        return this.http.get(this.url + "getTagByQuestionId/"+questionId, httpOptions);
    }
    createNewTag(newTagName: string){
        let newTag : Tag = new Tag();
        newTag.tagName = newTagName;
    return this.http.post(this.url + "createNewTag", newTag, httpOptions);
  }
}
