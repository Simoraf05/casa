import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyndicComponent } from './syndic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResidencesComponent } from './residences/residences.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';

const routes: Routes = [
  {path : '' , component: SyndicComponent},
  {path : 'dashboard' , component: DashboardComponent},
  {path : 'residences' , component: ResidencesComponent},
  {path : 'residences/add' , component: AddResidenceComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyndicRoutingModule { }
