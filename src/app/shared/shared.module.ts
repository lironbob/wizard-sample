import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanActivateGuard} from './services/guards/can-activate.service';
import {CanDeactivateGuard} from './services/guards/can-deactivate.service';
import {UserAsyncService} from './validators/user-async.service';
import {WizardService} from './services/wizard/wizard.service';
import {ConfirmComponent} from './component/confirm/confirm.component';
import {DialogService} from './services/dialog/dialog.service';
import {MdButtonModule, MdDialogModule} from '@angular/material';
import { KeysPipe } from './pipes/keys/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule
  ],
  declarations: [
    ConfirmComponent,
    KeysPipe
  ],
  providers: [
    CanActivateGuard,
    CanDeactivateGuard,
    UserAsyncService,
    WizardService,
    DialogService
  ],
  exports: [
    ConfirmComponent,
    KeysPipe
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class SharedModule {
}
