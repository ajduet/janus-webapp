import { TestBed, inject } from '@angular/core/testing';

import { PtoService } from './pto.service';
import {Trainer} from '../domain/trainer';

describe('PtoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtoService]
    });
  });

  it('should be created', inject([PtoService], (service: PtoService) => {
    expect(service).toBeTruthy();
  }));

  describe('formatDateTest', function () {
    it('Tests to make sure the date comes back formatted as year-month-day', function () {
      const d = new Date();
      const fd = PtoService.prototype.formatDate(d);
      const actual = fd;
      const should = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
      expect(actual).toBe(should);
    });
  });
});
