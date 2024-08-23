import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {RegisterUser} from "../../models/registerUser";
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isBusy: boolean = false;
  userAvailable: boolean = true;
  user: RegisterUser = {
    name: "", password: "", username: ""
  };

  @Input() submitAttempt = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    username: new FormControl('', [Validators.pattern(/^[a-z0-9.\-_]+$/), Validators.pattern(/^(?!.*[._\-]{2}).+$/)]),
  });

  pwdRegex = {
    name: 'min. 8 Zeichen',
    regex: '^.{8,}$'
  };

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService) { }

  isInvalid() {
    return this.formGroup.controls['name'].invalid ||
      this.formGroup.controls['username'].invalid;
  }

  ngOnInit(): void {
    this.formGroup.controls['name'].valueChanges.subscribe(value => this.user.name = value);

    this.formGroup.controls['username'].valueChanges.pipe(
      startWith(''),
      map(username => username.toLowerCase().trim()),
      tap(username => this.user.username = username),
      tap(username => this.formGroup.controls['username'].setValue(username, {emitEvent: false})),
      tap(u => console.log(u)),
      filter(username => username.length > 0),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((username) =>
        this.authService.isUsernameAvailable(username)
          .then(available => {console.log(available); this.userAvailable = !!available})
          .catch(err => console.log(err))
      )
    ).subscribe(a => console.log(a));
  }

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
