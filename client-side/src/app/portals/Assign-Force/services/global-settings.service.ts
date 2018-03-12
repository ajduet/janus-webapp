import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalSettings } from '../domain/global-settings';
import { UrlService } from './url.service';

/* Settings service manages the global application settings.
   Settings are saved or loaded from the url received from URL service */

@Injectable()
export class SettingsService {

  url = this.urlService.getUrl() + '/api/settings/api/v2/setting';

  constructor(private http: HttpClient,
    private urlService: UrlService) { }

  /** Returns settings from settings service */
  getSettings(): Observable<GlobalSettings[]> {
    return this.http.get<GlobalSettings[]>(this.url);

  }

  /** Save settings to settings service */
  saveSettings(settings: GlobalSettings): Observable<any> {
    return this.http.put<any>(this.url, settings);
  }
}
