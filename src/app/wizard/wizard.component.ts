import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public steps: MenuItem[];
  private _activeIndex: number;
  get activeIndex(): number {
    for (let j = 0; j < this.steps.length; j++) {
      if (j < this._activeIndex) {
        this.steps[j].styleClass = 'active';
      } else {
        this.steps[j].styleClass = null;
      }
    }
    return this._activeIndex;
  }

  set activeIndex(i: number) {
    this._activeIndex = i;
  }

  constructor() {
    this.steps = [
      {
        label: 'Create account',
        routerLink: ['/', 'create-user']
      },
      {
        label: 'Personal information',
        routerLink: ['/', 'personal-details']
      },
      {
        label: 'Complete your registration',
        routerLink: ['/', 'completion']
      }
    ];
  }

  ngOnInit() {
  }
}
