import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, ReactiveFormsModule]
})
export class LoginPage{
  isBusy: boolean = false;
  wrongCredentials: boolean = false;
  credentials = {
    username: "", password: ""
  }

  constructor(private readonly router:Router,
              private readonly authService: AuthenticationService) { }

  login() {
    console.log('Logging in with', this.credentials.username, this.credentials.password);

    this.isBusy = true;
    this.wrongCredentials = false;

    this.authService.login(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/')
      })
      .catch(() => {
        this.wrongCredentials = true;
      })
      .finally(() => this.isBusy = false);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
