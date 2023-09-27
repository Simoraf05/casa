import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/adminor/component/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'advanced-ui',
    loadChildren: () =>
      import('src/app/adminor/component/advance-ui/advance-ui.module').then(
        (m) => m.AdvanceUiModule
      ),
  },
  {
    path: 'elements',
    loadChildren: () =>
      import('src/app/adminor/component/elements/elements.module').then(
        (m) => m.ElementsModule
      ),
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('src/app/adminor/component/apps/apps.module').then((m) => m.AppsModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('src/app/adminor/component/forms/forms.module').then((m) => m.FormModule),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('src/app/adminor/component/charts/charts.module').then(
        (m) => m.ChartsModule
      ),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('src/app/adminor/component/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('src/app/adminor/component/icons/icons.module').then((m) => m.IconsModule),
  },
  {
    path: 'ecommerce',
    loadChildren: () =>
      import('src/app/adminor/component/ecommerce/ecommerce.module').then(
        (m) => m.EcommerceModule
      ),
  },
  {
    path: 'utilities',
    loadChildren: () =>
      import('src/app/adminor/component/utilities/utilities.module').then(
        (m) => m.UtilitiesModule
      ),
  },
];