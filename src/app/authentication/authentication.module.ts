import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RegisterPage} from "./register/register.page";
import {InputPwdComponent} from "./input-pwd/input-pwd.component";
import {LoginPage} from "./login/login.page";

@NgModule({
  declarations: [RegisterPage, LoginPage, InputPwdComponent],
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
