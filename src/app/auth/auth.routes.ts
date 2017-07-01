import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

export const authRoutes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: '**', redirectTo: 'login'}
];
