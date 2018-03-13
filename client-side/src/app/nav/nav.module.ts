import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaliberNavComponent } from './caliber-nav/caliber-nav.component';
import { MinervaComponent } from '../portals/Minerva/minerva.component';
import { MinervaNavComponent } from './minerva-nav/minerva-nav.component';
import { TracknForceNavComponent } from './track-force-nav/track-force-nav.component';
import { BamNavComponent } from './bam-nav/bam-nav.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
  ],
  declarations: [
    NavComponent,
    CaliberNavComponent,
    MinervaNavComponent,
    TracknForceNavComponent,
    BamNavComponent
  ],
  providers: [],
  exports: [NavComponent]
})
export class NavModule { }
