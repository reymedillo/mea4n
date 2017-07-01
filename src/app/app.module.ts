import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';

// Services
import {PostsService} from './services/posts.service';
import {AuthService} from './services/auth.service';
// My Components
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from './sidebar/sidebar.module';
import {AuthMiddleware} from './middlewares/auth.middleware';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SidebarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthMiddleware,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
