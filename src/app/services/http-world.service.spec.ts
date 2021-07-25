import { TestBed } from '@angular/core/testing';

import { HttpWorldService } from './http-world.service';

describe('HttpWorldService', () => {
  let service: HttpWorldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWorldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
