import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkSpaceComponent } from './work-space.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';

const routes: Routes = [
  {
    path: 'holder/home',
    component: WorkSpaceComponent,
  },
  { path: 'work-space/agent-detail', component: AgentDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkSpaceRoutingModule { }
