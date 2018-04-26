import { Routes } from '@angular/router';
import { GuardService as AuthGuard } from './services/auth/guard.service';
import { OverviewComponent } from './components/overview/overview.component';
import { environment } from '../../../environments/environment';
import { BatchesComponent } from './components/batches/batches.component';
import { LocationsComponent } from '../Caliber/settings/locations/locations.component';
import { CurriculaComponent } from './components/curricula/curricula.component';
import { TrainersComponent } from '../Caliber/settings/trainers/trainers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from '../Caliber/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: environment.ROUTEPATHS.assignforceRoutes.overview,
        component: OverviewComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.batches,
        component: BatchesComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.locations,
        component: LocationsComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.curricula,
        component: CurriculaComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.trainers,
        component: TrainersComponent
      },
      {
        path: `${environment.ROUTEPATHS.assignforceRoutes.profile}/:id`,
        component: ProfileComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.reports,
        component: ReportsComponent
      },
      {
        path: environment.ROUTEPATHS.assignforceRoutes.settings,
        component: SettingsComponent
      },
      {
        path: '**',
        redirectTo: environment.ROUTEPATHS.assignforceRoutes.overview
      }
    ]
  }
];
