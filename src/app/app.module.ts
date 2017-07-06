import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {WizardComponent} from './wizard/wizard.component';
import {CreateUserComponent} from './wizard/create-user/create-user.component';
import {PersonalDetailsComponent} from './wizard/personal-details/personal-details.component';
import {MaterialModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BreadcrumbModule} from 'primeng/primeng';
import { CompletionComponent } from './wizard/completion/completion.component';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    CreateUserComponent,
    PersonalDetailsComponent,
    CompletionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
