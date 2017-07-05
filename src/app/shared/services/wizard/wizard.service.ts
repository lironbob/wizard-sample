import {Injectable} from '@angular/core';

@Injectable()
export class WizardService {

  private _steps: { [key: string]: any };

  constructor() {
    this._steps = {};
  }

  setStep(step: string, values: any) {
    this._steps[step] = values;
    console.log('this._steps', this._steps);
  }

  getSteps(step: string): any {
    return this._steps[step] || null;
  }

}
