import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RegisterPage} from "./register/register.page";
import {LoginPage} from "./login/login.page";



@NgModule({
  declarations: [RegisterPage, LoginPage],
  imports: [
    AuthRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
