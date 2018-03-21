import { TestBed, inject } from '@angular/core/testing';

import { ScreeningsService } from './screenings.service';

describe('ScreeningsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreeningsService]
    });
  });

  it('should be created', inject([ScreeningsService], (service: ScreeningsService) => {
    expect(service).toBeTruthy();
  }));
});
