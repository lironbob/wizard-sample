import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidators, PasswordValidators} from 'ngx-validators';
import {UserAsyncService} from '../../shared/validators/user-async.service';
import {WizardService} from '../../shared/services/wizard/wizard.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: FormGroup;

  constructor(private fb: FormBuilder, private userAsync: UserAsyncService, private wizardService: WizardService) {
    this.user = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        EmailValidators.normal
      ], [
        (control) => {
          return this.userAsync.validate(control);
        }
      ]),
      password: this.fb.control('', [
        Validators.required,
        PasswordValidators.alphabeticalCharacterRule(1),
        PasswordValidators.uppercaseCharacterRule(1),
        PasswordValidators.lowercaseCharacterRule(1),
        PasswordValidators.digitCharacterRule(1),
        PasswordValidators.specialCharacterRule(1)
      ]),
      passwordMatch: this.fb.control('')
    });
    this.user.setValidators(PasswordValidators.mismatchedPasswords('password', 'passwordMatch'));
  }

  submit() {
    if (this.user.valid) {
      const values = Object.assign({}, this.user.value);
      delete values.passwordMatch;
      this.wizardService.setStep('create-user', values);
    }
  }

  ngOnInit() {
    this.user.controls['password'].setValue('aA1!');
    this.user.controls['passwordMatch'].setValue('aA1!');
  }

  canDeactivate(){
    return this.wizardService.getSteps('create-user') ? true : false;
  }

}
