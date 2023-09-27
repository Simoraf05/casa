import { Routes } from "@angular/router";

export const Content_Routes: Routes = [
  {
    path: 'custompages',
    loadChildren: () =>
      import('src/app/adminor/component/custom-pages/custom-pages.module').then(
        (m) => m.CustomPagesModule
      ),
  },
];