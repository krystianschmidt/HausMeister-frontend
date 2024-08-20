import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


interface SecurePasswordRegEx{
  name: string
  regex: string
}


@Component({
  selector: 'app-input-pwd',
  templateUrl: './input-pwd.component.html',
  styleUrls: ['./input-pwd.component.scss']
})
export class InputPwdComponent implements OnInit {
  @Output() value = new EventEmitter<string>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() invalid = new EventEmitter<boolean>();
  @Input() type: 'enter' | 'new' | 'repeat' = 'enter';

  /* eslint-disable @angular-eslint/no-input-rename */
  @Input('repeatedPwd') set _repeatedPwd(pwd: string) {
    this.repeatedPwd = pwd;
    this.formControl.updateValueAndValidity();
  };

  @Input()label: string = '';
  @Input() submitAttempt = false;

  repeatedPwd: string = '';
  hide = true;
  formControl: FormControl = new FormControl('',[Validators.required]);

  @Input() securePasswordRegEx: SecurePasswordRegEx[] = [
    { name: 'min. 8 Zeichen', regex: '^.{8,}$' },
    { name: 'min. ein Kleinbuchstabe', regex: '(.*[a-z].*)' },
    { name: 'min. ein Großbuchstabe', regex: '(.*[A-Z].*)' },
    { name: 'min. eine Zahl', regex: '(.*\\d.*)' }
  ];

  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'enter':
        if (!this.label) this.label = 'Passwort';
        break;
      case 'new':
        if (!this.label) this.label = 'Passwort';
        this.securePasswordRegEx.forEach(p => this.formControl.addValidators(Validators.pattern(p.regex)));
        break;
      case 'repeat':
        if (!this.label) this.label = 'Passwort wiederholen';
        this.formControl.addValidators(this.repeatedPwdValidator());
        break;
    }

    this.invalid.emit(!this.formControl.value);
    this.formControl.statusChanges.subscribe(() => this.invalid.emit(this.formControl.invalid));
    this.formControl.valueChanges.subscribe(change => {
      this.value.emit(change);
    });
  }

  repeatedPwdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const repeatValid = this.formControl.value === this.repeatedPwd;
      console.log(control.value, this.repeatedPwd)
      if(this.type === 'repeat')
        return !repeatValid ? {wrongRepeat: {repeat: control.value, original: this.repeatedPwd}} : null;

      return repeatValid ? {wrongRepeat: {repeat: control.value, original: this.repeatedPwd}} : null;
    };
  }

  checkRegex(regex: string): boolean {
    return new RegExp(regex).test(this.formControl.value);
  }
}
