import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MinervaComponent } from './minerva.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { OverviewComponent } from './overview/overview.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BatchesComponent } from './batches/batches.component';
import { LocationsComponent } from './locations/locations.component';
import { CurriculaComponent } from './curricula/curricula.component';
import { TrainersComponent } from './trainers/trainers.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MinervaComponent,
    children: [
      {
        path: 'loginsuccess',
        component: LoginSuccessComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuardService],
        pathMatch: 'full'
      },
      {
        path: 'batches',
        component: BatchesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'locations',
        component: LocationsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'curricula',
        component: CurriculaComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'trainers',
        component: TrainersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        pathMatch: 'full'
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      }
    ]
  }
];
