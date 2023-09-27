import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyndicRoutingModule } from './syndic-routing.module';
import { SyndicComponent } from './syndic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResidencesComponent } from './residences/residences.component';


@NgModule({
  declarations: [

  
  ],
  imports: [
    CommonModule,
    SyndicRoutingModule
  ]
})
export class SyndicModule { }
