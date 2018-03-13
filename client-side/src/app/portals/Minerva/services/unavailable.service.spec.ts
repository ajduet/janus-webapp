import { TestBed, inject } from '@angular/core/testing';

import { UnavailableService } from './unavailable.service';

describe('UnavailableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnavailableService]
    });
  });

  it('should be created', inject([UnavailableService], (service: UnavailableService) => {
    expect(service).toBeTruthy();
  }));
});
