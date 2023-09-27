import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { LayoutModulesComponent } from './shared/layout-modules/layout-modules.component';
import { AccueilRoutingModule } from './accueil/accueil-routing.module';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from '../holder/shared/header/header.component';


@NgModule({
  declarations: [
    //AccueilComponent,
    //HeaderComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    //AccueilRoutingModule,
    RouterModule
  ],

})
export class ModulesModule { }
