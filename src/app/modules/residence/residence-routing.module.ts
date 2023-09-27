import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenceComponent } from './residence.component';
import { ListResidencesComponent } from './list-residences/list-residences.component';
import { DetailResidenceComponent } from './detail-residence/detail-residence.component';

const routes: Routes = [
  {path : '' , component: ResidenceComponent},
  {path : 'list-residences' , component: ListResidencesComponent},
  {path : 'residence-details' , component: DetailResidenceComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenceRoutingModule { }
