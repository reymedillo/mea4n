import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {authRoutes} from './auth.routes';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [

  ]
})

export class AuthModule {}
