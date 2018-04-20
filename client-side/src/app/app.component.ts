import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SecurityConfig } from './services/security-config';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.handleAuthentication();
    authService.scheduleRenewal();
  }

  ngOnInit() {
  }
}
