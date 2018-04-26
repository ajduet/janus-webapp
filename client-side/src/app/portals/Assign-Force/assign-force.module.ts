import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { routes } from './assign-force.routing';

import { AssignForceComponent } from './assign-force.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from '../../nav/nav.component';
import { NavModule } from '../../nav/nav.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SecurityContext } from '../../services/security-context.service';
import { OverviewComponent } from './components/overview/overview.component';
import { AddFocusComponent } from './components/add-focus/add-focus.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { BatchesComponent } from './components/batches/batches.component';
import { BatchesTimelineComponent } from './components/batches-timeline/batches-timeline.component';
import { BatchesTimelineFilterComponent } from './components/batches-timeline-filter/batches-timeline-filter.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { CoreComponent } from './components/core/core.component';
import { CurriculaComponent } from './components/curricula/curricula.component';
import { CurriculumSkillsComponent } from './components/curriculum-skills/curriculum-skills.component';
import { EditFocusComponent } from './components/edit-focus/edit-focus.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { FociComponent } from './components/foci/foci.component';
import { LocationsComponent } from './components/locations/locations.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from '../Caliber/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TrainersComponent } from '../Caliber/settings/trainers/trainers.component';

import { AddressControllerService } from './services/api/address-controller/address-controller.service';
import { BuildingControllerService } from './services/api/building-controller/building-controller.service';
import { BatchControllerService } from './services/api/batch-controller/batch-controller.service';
import { CurriculumControllerService } from './services/api/curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from './services/api/focus-controller/focus-controller.service';
import { RoomControllerService } from './services/api/room-controller/room-controller.service';
import { SettingControllerService } from './services/api/setting-controller/setting-controller.service';
import { SkillControllerService } from './services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from './services/api/trainer-controller/trainer-controller.service';
import { UnavailableControllerService } from './services/api/unavailable-controller/unavailable-controller.service';
import { S3CredentialService } from './services/s3-credential/s3-credential.service';
import { UrlService } from './services/url/url.service';



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
    OverviewComponent,
    AddFocusComponent,
    AddSkillComponent,
    BatchesComponent,
    BatchesTimelineComponent,
    BatchesTimelineFilterComponent,
    CertificationsComponent,
    CoreComponent,
    CurriculaComponent,
    CurriculumSkillsComponent,
    EditFocusComponent,
    EditSkillComponent,
    FociComponent,
    LocationsComponent,
    MenuBarComponent,
    ProfileComponent,
    ReportsComponent,
    SettingsComponent,
    SkillsComponent,
    TrainersComponent
  ],
  providers: [
    SecurityContext,
    AddressControllerService,
    BuildingControllerService,
    BatchControllerService,
    CurriculumControllerService,
    FocusControllerService,
    RoomControllerService,
    SettingControllerService,
    SkillControllerService,
    TrainerControllerService,
    UnavailableControllerService,
    S3CredentialService,
    UrlService
  ]
})
export class AssignForceModule { }
