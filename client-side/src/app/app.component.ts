import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'apps';

  constructor(private mat: MatIconRegistry, private dom: DomSanitizer) {
    mat.addSvgIcon('filter', dom.bypassSecurityTrustResourceUrl('../assets/img/ic_settings_white_24px.svg'));
  }
}
