import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import {Room} from '../domain/room';

describe('RoomService', () => {

  let service: RoomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [RoomService]
    });

    service = TestBed.get(RoomService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([RoomService], () => {
    expect(service).toBeTruthy();
  }));

  it('should retrieves one room from api', () => {
    const fakeRoom: Room = {
      roomID: 1,
      roomName: 'test room',
      building: 1,
      active: true
    };

    service.getById(1).subscribe(room => {
      expect(room.roomID).toBe(1);
      expect(room).toEqual(fakeRoom);
    });

    const request = httpMock.expectOne(`${service.url}/1`);
    expect(request.request.method).toBe(`GET`);
    request.flush(fakeRoom);
  });

  it('should retrieves all rooms from api', () => {
    const fakeRooms: Room[] = [
      {
        roomID: 1,
        roomName: 'test room',
        building: 1,
        active: true
      },
      {
        roomID: 2,
        roomName: 'test room 2',
        building: 2,
        active: true
      }
    ];

    service.getAll().subscribe(rooms => {
      expect(rooms).toEqual(fakeRooms);
    });

    const request = httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe(`GET`);
    request.flush(fakeRooms);
  });
});
