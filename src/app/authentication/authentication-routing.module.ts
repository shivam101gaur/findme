import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationPage } from './authentication.page';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationPage,
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      { path:'login',component:LoginComponent },
      { path:'registration',component:RegistrationComponent },
      { path:'reset_password',component:ResetPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
