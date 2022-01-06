import { TestBed } from '@angular/core/testing';

import { RoomMetaService } from './room-meta.service';

describe('RoomMetaService', () => {
  let service: RoomMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
