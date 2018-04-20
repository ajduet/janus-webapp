import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';
import { SecurityContext } from '../../../services/security-context.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private userIsAuthenticated = false;

  constructor(private securityContext: SecurityContext,
    private authService: AuthService) { }

  ngOnInit() {

    if (this.authService.isAuthenticated() &&
      this.authService.userHasRole(this.securityContext.getSecurityConfig().roles)) {
      this.userIsAuthenticated = true;
    }
  }

  newJoke() {
  }

  // clean up subscriptions
  ngOnDestroy() {
  }

}
