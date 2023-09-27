import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { LoginPageComponent } from 'src/app/adminor/authentication/login-page/login-page.component';
 import { RegisterComponent } from 'src/app/adminor/authentication/register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [ 
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class AuthenticationRoutingModule { }
