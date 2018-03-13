import { TestBed, inject } from '@angular/core/testing';

import { ReplogicService } from './replogic.service';

describe('ReplogicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplogicService]
    });
  });

  it('should be created', inject([ReplogicService], (service: ReplogicService) => {
    expect(service).toBeTruthy();
  }));
});
