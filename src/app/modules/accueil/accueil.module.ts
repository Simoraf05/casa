import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilRoutingModule } from './accueil-routing.module';
import { EspaceTravailComponent } from './espace-travail/espace-travail.component';

@NgModule({
  declarations: [
    //EspaceTravailComponent,
    //HeaderComponent,
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule
  ]
})
export class AccueilModule { }
