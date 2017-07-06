import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidators, PasswordValidators} from 'ngx-validators';
import {UserAsyncService} from '../../shared/validators/user-async.service';
import {WizardService} from '../../shared/services/wizard/wizard.service';
import {DialogService} from '../../shared/services/dialog/dialog.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: FormGroup;

  constructor(private fb: FormBuilder,
              private userAsync: UserAsyncService,
              private wizardService: WizardService,
              private dialogService: DialogService,
              private router: Router) {
  }

  ngOnInit() {
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
    if (this.wizardService.getSteps('create-user')) {
      for (const key in this.wizardService.getSteps('create-user')) {
        switch (key) {
          case 'password':
            this.user.controls['passwordMatch'].setValue(this.wizardService.getSteps('create-user')[key]);
          default:
            this.user.controls[key].setValue(this.wizardService.getSteps('create-user')[key]);
        }

      }
    }
  }

  canDeactivate() {
    const completed = this.wizardService.getSteps('create-user') ? true : false;
    if (!completed) {
      return false;
    } else {
      if (!this.user['submitted'] && this.user.dirty) {
        return new Observable(ob => {
          this.dialogService
            .confirm('You are about to leave this page without saving', 'Do you wish to continue?')
            .subscribe(res => ob.next(res));
        });
      } else {
        return true;
      }
    }
  }

  submit() {
    if (this.user.valid) {
      this.user['submitted'] = true;
      const values = Object.assign({}, this.user.value);
      delete values.passwordMatch;
      const success = this.wizardService.setStep('create-user', values, 'add');
      success.add(() => {
        this.router.navigate(['personal-details']);
      });
    }
  }

}
