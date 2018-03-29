import { TestBed, inject } from '@angular/core/testing';

import { BucketService } from './bucket.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketService]
    });
  });

  it('should be created', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));
});
