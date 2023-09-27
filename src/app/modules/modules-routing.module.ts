import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  //{path: 'accueil' , component: AccueilComponent},
  //{path: 'accueil/espaceDeTravail' , component: EspaceTravailComponent},
  {
    path: 'module/accueil',
    loadChildren: () =>
      import('./accueil/accueil-routing.module').then((m) => m.AccueilRoutingModule),
  },
  {
    path: 'module/admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'module/agents',
    loadChildren: () =>
      import('./agents/agents-routing.module').then((m) => m.AgentsRoutingModule),
  },
  {
    path: 'module/residence',
    loadChildren: () =>
      import('./residence/residence-routing.module').then((m) => m.ResidenceRoutingModule),
  },
  {
    path: 'module/syndic',
    loadChildren: () =>
      import('./syndic/syndic-routing.module').then((m) => m.SyndicRoutingModule),
  },
  {
    path: 'module/tasks',
    loadChildren: () =>
      import('./tasks/tasks-routing.module').then((m) => m.TasksRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
