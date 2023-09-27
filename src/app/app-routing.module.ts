import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { LandingPageComponent } from './adminor/component/landing-page/landing-page/landing-page.component';
import { LayoutComponent } from './holder/shared/layout/layout.component';
import { ErrorLayoutComponent } from './adminor/shared/layout-components/layout/error-layout/error-layout.component';
import { SwitcherlayoutComponent } from './adminor/shared/layout-components/layout/switcherlayout/switcherlayout.component';
import { Content_Routes } from './adminor/shared/routes/error.routes';
import { landing_page_Routes } from './adminor/shared/routes/landingpage';
import { content } from './adminor/shared/routes/routes';
import { SwitcherOneRoute } from './adminor/shared/routes/switchers';
import { Error404Component } from './adminor/component/custom-pages/error404/error404.component';
import { LandingpageLayoutComponent } from './adminor/shared/layout-components/layout/landingpage-layout/landingpage-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./holder/holder.module').then((m) => m.HolderModule),
  },
  {
    path: 'adminor',
    loadChildren: () =>
      import('./adminor/adminor-routing.module').then((m) => m.AdminorRoutingModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/modules-routing.module').then((m) => m.ModulesRoutingModule),
  },
  {
    path: 'redirect-page',
    loadChildren: () =>
      import('./page-redirect/page-redirect-routing.module').then((m) => m.PageRedirectRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
