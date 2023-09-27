import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { EspaceTravailComponent } from './espace-travail/espace-travail.component';

const routes: Routes = [
  {path: '' , component: AccueilComponent},
  {path: 'espaceDeTravail' , component: EspaceTravailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
