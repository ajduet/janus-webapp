import { Injectable } from '@angular/core';

@Injectable()
export class UrlUtilService {

  // base url to get to the zuul gateway
  readonly zuulEndpoint = "https://hydra-gateway-service.cfapps.io";

  constructor() { }

  public getBase(): string {
    return this.zuulEndpoint;
  }


}
