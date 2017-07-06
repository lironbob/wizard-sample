import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAsyncService} from '../../shared/validators/user-async.service';
import {WizardService} from '../../shared/services/wizard/wizard.service';
import {DialogService} from '../../shared/services/dialog/dialog.service';
import {Router} from '@angular/router';
import {PhoneValidators} from 'ngx-validators';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  public info: FormGroup;

  constructor(private fb: FormBuilder,
              private userAsync: UserAsyncService,
              private wizardService: WizardService,
              private dialogService: DialogService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.info = this.fb.group({
      'first name': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      'last name': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      contact: this.fb.group({
        home: this.fb.control('', [PhoneValidators.isPhoneNumber('IL')]),
        mobile: this.fb.control('', [PhoneValidators.isPhoneNumber('IL')]),
        address: this.fb.control('', [Validators.minLength(5)]),
      })
    });

    if (this.wizardService.getSteps('personal-details')) {
      for (const key in this.wizardService.getSteps('personal-details')) {
        if (this.info.controls[key]['controls']) {
          for (const k in this.wizardService.getSteps('personal-details')[key]) {
            this.info.controls[key]['controls'][k].setValue(this.wizardService.getSteps('personal-details')[key][k]);
          }
        } else {
          this.info.controls[key].setValue(this.wizardService.getSteps('personal-details')[key]);
        }

      }
    }
  }

  canDeactivate() {
    const completed = this.wizardService.getSteps('personal-info') ? true : false;
    if (!completed) {
      return false;
    } else {
      if (!this.info['submitted'] && this.info.dirty) {
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

  back() {
    if (!this.info['submitted'] && this.info.dirty) {
      this.dialogService
        .confirm('You are about to leave this page without saving', 'Do you wish to continue?')
        .subscribe(res => {
          if (res) {
            this.location.back();
          }
        });
    } else {
      this.location.back();
    }
  }

  submit() {
    if (this.info.valid) {
      this.info['submitted'] = true;
      this.wizardService.setStep('personal-details', this.info.value, 'update').add(() => {
        this.router.navigate(['completion']);
      });
    }
  }

}
