import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './assign-force.routes';
import { AssignForceComponent } from './assign-force.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from '../../nav/nav.component';
import { NavModule } from '../../nav/nav.module';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { SecurityContext } from '../../services/security-context.service';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AssignForceComponent,
    HomeComponent,
    CalendarComponent,
  ],
  providers: [
    SecurityContext
  ]
})
export class AssignForceModule { }
