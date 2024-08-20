import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AuthenticationModule} from "../authentication.module";
import {IAmService} from "../../../services/authentication/i-am.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  isBusy: boolean = false;
  wrongCredentials: boolean = false;
  submitAttempt = false;
  credentials = {
    username: "", password: ""
  }

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
  });

  constructor(private readonly authService: AuthenticationService,
              private readonly router: Router,
              private readonly iAmService: IAmService) {
  }

  login() {
    console.log('Logging in with', this.credentials.username, this.credentials.password);

    this.isBusy = true;
    this.wrongCredentials = false;
    this.submitAttempt = true;

    this.authService.login(this.credentials)
      .then((res) => {
        this.router.navigateByUrl('/')
      })
      .catch(() => {
        this.wrongCredentials = true;
      })
      .finally(() => this.isBusy = false);
  }

  ngOnInit(): void {
    this.formGroup.controls['username'].valueChanges.subscribe(value => this.credentials.username = value);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
