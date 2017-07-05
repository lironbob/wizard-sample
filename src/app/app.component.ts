import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
        <a routerLink="create-user">create-user</a> | <a routerLink="personal-details">personal-details</a> 
    </nav>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}
