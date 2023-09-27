import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRedirectComponent } from './page-redirect.component';

const routes: Routes = [
  { path: ':redirect-token', component: PageRedirectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRedirectRoutingModule { }
