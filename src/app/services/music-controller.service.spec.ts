import { TestBed } from '@angular/core/testing';

import { MusicControllerService } from './music-controller.service';

describe('MusicControllerService', () => {
  let service: MusicControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
