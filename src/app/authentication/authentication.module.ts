import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { AuthenticationPage } from './authentication.page';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    AngularMaterialModule,

  ],
  declarations: [AuthenticationPage, LoginComponent,RegistrationComponent,ResetPasswordComponent]
})
export class AuthenticationPageModule {}
