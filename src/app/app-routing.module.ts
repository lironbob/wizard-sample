import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WizardComponent} from './wizard/wizard.component';
import {CreateUserComponent} from './wizard/create-user/create-user.component';
import {PersonalDetailsComponent} from './wizard/personal-details/personal-details.component';
import {CanDeactivateGuard} from './shared/services/guards/can-deactivate.service';
import {CanActivateGuard} from './shared/services/guards/can-activate.service';
import {CompletionComponent} from './wizard/completion/completion.component';

const routes: Routes = [
  {
    path: '',
    component: WizardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create-user'
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'personal-details',
        component: PersonalDetailsComponent
      },
      {
        path: 'completion',
        component: CompletionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
