import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthMiddleware} from './middlewares/auth.middleware';

export const appRoutes:Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthMiddleware]},
  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},

  {path: '**', redirectTo: 'auth'}
];
