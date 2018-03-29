import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsViolationServiceService } from './soft-skills-violation-service.service';

describe('SoftSkillsViolationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftSkillsViolationServiceService]
    });
  });

  it('should be created', inject([SoftSkillsViolationServiceService], (service: SoftSkillsViolationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
