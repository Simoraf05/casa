import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from 'src/app/adminor/shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from 'src/app/adminor/shared/layout-components/layout/error-layout/error-layout.component';
import { SwitcherlayoutComponent } from 'src/app/adminor/shared/layout-components/layout/switcherlayout/switcherlayout.component';
import { Content_Routes } from 'src/app/adminor/shared/routes/error.routes';
import { landing_page_Routes } from 'src/app/adminor/shared/routes/landingpage';
import { content } from 'src/app/adminor/shared/routes/routes';
import { SwitcherOneRoute } from 'src/app/adminor/shared/routes/switchers';
import { Error404Component } from 'src/app/adminor/component/custom-pages/error404/error404.component';
import { LandingpageLayoutComponent } from 'src/app/adminor/shared/layout-components/layout/landingpage-layout/landingpage-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'adminor/auth/login', pathMatch: 'full' },
  {
    path: 'adminor',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    children: Content_Routes,
  },
  {
    path: '',
    component: SwitcherlayoutComponent,
    children: SwitcherOneRoute,
  },
  {
    path: '',
    component: LandingpageLayoutComponent,
    children: landing_page_Routes,
  },
  {
    path: '',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  { path: '**', component: Error404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class AdminorRoutingModule { }
