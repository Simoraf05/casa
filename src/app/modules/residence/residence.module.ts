import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidenceRoutingModule } from './residence-routing.module';
import { ResidenceComponent } from './residence.component';
import { DetailResidenceComponent } from './detail-residence/detail-residence.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ResidenceRoutingModule
  ]
})
export class ResidenceModule { }
