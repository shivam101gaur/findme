import { TestBed } from '@angular/core/testing';

import { AlertCreaterService } from './alert-creater.service';

describe('AlertCreaterService', () => {
  let service: AlertCreaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertCreaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
