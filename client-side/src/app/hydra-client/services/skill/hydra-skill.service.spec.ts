import { TestBed, inject } from '@angular/core/testing';

import { HydraSkillService } from './hydra-skill.service';

describe('HydraSkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HydraSkillService]
    });
  });

  it('should be created', inject([HydraSkillService], (service: HydraSkillService) => {
    expect(service).toBeTruthy();
  }));
});
