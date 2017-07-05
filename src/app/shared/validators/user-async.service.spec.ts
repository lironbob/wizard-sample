import { TestBed, inject } from '@angular/core/testing';

import { UserAsyncService } from './user-async.service';

describe('UserAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAsyncService]
    });
  });

  it('should ...', inject([UserAsyncService], (service: UserAsyncService) => {
    expect(service).toBeTruthy();
  }));
});
