import { TestBed, inject } from '@angular/core/testing';

import { WizardService } from './wizard.service';

describe('WizardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizardService]
    });
  });

  it('should ...', inject([WizardService], (service: WizardService) => {
    expect(service).toBeTruthy();
  }));
});
