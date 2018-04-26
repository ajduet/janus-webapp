import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UrlService {
  constructor() {}

  getBaseUrl(): string {
    return environment.baseUrl;
  }

  // getLoginUrl(): string {
  //   return environment.ROUTEPATHS.assignforceRoutes.login;
  // }

  getOverviewUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.overview;
  }

  getBatchesUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.batches;
  }

  getLocationsUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.locations;
  }

  getCurriculaUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.curricula;
  }

  getTrainersUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.trainers;
  }

  getProfileUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.profile;
  }

  getReportsUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.reports;
  }

  getSettingsUrl(): string {
    return environment.ROUTEPATHS.assignforceRoutes.settings;
  }
}
