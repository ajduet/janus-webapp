import { TestBed, inject } from '@angular/core/testing';

import { ScreeningService } from './screenings.service';

describe('ScreeningsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreeningService]
    });
  });

  it('should be created', inject([ScreeningService], (service: ScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
