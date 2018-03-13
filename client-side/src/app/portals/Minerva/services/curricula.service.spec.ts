import { TestBed, inject } from '@angular/core/testing';

import { CurriculaService } from './curricula.service';

describe('CurriculaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculaService]
    });
  });

  it('should be created', inject([CurriculaService], (service: CurriculaService) => {
    expect(service).toBeTruthy();
  }));
});
