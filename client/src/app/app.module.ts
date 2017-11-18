import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttp, AuthConfig} from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from './auth-guard.service';

const routes:Routes=[
  {path:'',pathMatch:'full',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthGuardService,AuthHttp,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
