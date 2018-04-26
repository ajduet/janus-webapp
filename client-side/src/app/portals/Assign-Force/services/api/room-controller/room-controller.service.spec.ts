import { TestBed, inject } from '@angular/core/testing';

import { RoomControllerService } from './room-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RoomControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomControllerService, HttpClient, HttpHandler]
    });
  });

  it(
    'should be created',
    inject([RoomControllerService], (service: RoomControllerService) => {
      expect(service).toBeTruthy();
    })
  );
});
