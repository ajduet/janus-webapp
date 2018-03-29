import { Injectable } from '@angular/core';


/*
Utility service that holds the base url for the Zuul gateway. 
Any component or service that needs to communicate with anything else 
in the Hydra ecosystem must access Zuul 
through the URL provided by this service. 

The primary benefit is that if the Zuul gateway changes, 
only a single line of code needs to be changed in response
*/
@Injectable()
export class UrlUtilService {

  // base url to get to the zuul gateway
  readonly zuulEndpoint = "https://hydra-gateway-service.cfapps.io";

  constructor() { }

  public getBase(): string {
    return this.zuulEndpoint;
  }


}
