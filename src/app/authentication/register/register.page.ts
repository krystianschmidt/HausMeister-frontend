import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {RegisterUser} from "../../models/registerUser";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton]
})
export class RegisterPage  {
  isBusy: boolean = false;
  userAvailable: boolean = true;
  user: RegisterUser = {
    name: "", password: "", username: ""
  };

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService) { }



  register() {
    console.log('Registering with', this.user.name, this.user.username, this.user.password);

    this.isBusy = true;
    this.authService.register(this.user)
      .then((res:any) => {
        this.authService.login({username: this.user.username, password: this.user.password})
          .then(() =>
            this.router.navigateByUrl('/')
          )
      })
      .finally(() => this.isBusy = false);
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
