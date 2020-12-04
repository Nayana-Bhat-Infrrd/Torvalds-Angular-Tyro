import { TestBed } from '@angular/core/testing';

import { ReadpostService } from './readpost.service';

describe('ReadpostService', () => {
  let service: ReadpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
