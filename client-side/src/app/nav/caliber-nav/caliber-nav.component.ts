import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouteService } from '../../portals/Caliber/services/route.service';
import { Subscription } from 'rxjs/Subscription';
import { Routes } from '@angular/router/src/config';
import { OnDestroy } from '@angular/core/';
import { routes } from '../../portals/Caliber/caliber.routes';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caliber-nav',
  templateUrl: './caliber-nav.component.html',
  styleUrls: ['./caliber-nav.component.css'],
  providers: [ RouteService ],
})
export class CaliberNavComponent implements OnInit, OnDestroy {
  @Input()
  collapsed = false;

  willShow(path) {
    routes.forEach(r => {
      if (r.path == path) {
        console.log(r.data.roles);
        return r.data.roles.includes(this.cookies.get('role'));
      }
    });
    routes[0].children.forEach(r => {
      if (r.path == path) {
        console.log(r.data.roles);
        return r.data.roles.includes(this.cookies.get('role'));
      }    });
    return false;
  }

  @Output()
  collapse: EventEmitter<any> = new EventEmitter<any>();

  private routeService: RouteService;
  private routeSubscription: Subscription;
  private userRole= this.cookies.get('role');

  showHome= true;
  showManage: boolean= this.userRole == 'ROLE_VP' || this.userRole == 'ROLE_TRAINER' || this.userRole == 'ROLE_QC' || this.userRole == 'ROLE_PANEL';
  showAssess: boolean= this.userRole == 'ROLE_VP' || this.userRole == 'ROLE_TRAINER';
  showQuality: boolean= this.userRole == 'ROLE_VP' || this.userRole == 'ROLE_QC';
  showPanel: boolean= this.userRole == 'ROLE_VP' || this.userRole == 'ROLE_PANEL';
  showScreening: boolean= this.userRole == 'ROLE_VP' || this.userRole == 'ROLE_SCREENER';
  showReports= true;

  routes: Routes;

  constructor(routeSrv: RouteService, private cookies: CookieService) {
    this.routeService = routeSrv;
    this.routes = [];
  }

  ngOnInit() {
    this.routeSubscription = this.routeService.getTopNavRoutes()
      .subscribe( (routes) => this.routes = routes );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapse.emit(this.collapsed);
  }
}
