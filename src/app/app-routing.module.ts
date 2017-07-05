import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WizardComponent} from './wizard/wizard.component';
import {CreateUserComponent} from './wizard/create-user/create-user.component';
import {PersonalDetailsComponent} from './wizard/personal-details/personal-details.component';
import {CanDeactivateGuard} from './shared/services/guards/can-deactivate.service';

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
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'personal-details',
        component: PersonalDetailsComponent
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
