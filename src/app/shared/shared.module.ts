import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanDeactivateGuard} from './services/guards/can-deactivate.service';
import {UserAsyncService} from './validators/user-async.service';
import {WizardService} from './services/wizard/wizard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CanDeactivateGuard,
    UserAsyncService,
    WizardService
  ]
})
export class SharedModule {
}
