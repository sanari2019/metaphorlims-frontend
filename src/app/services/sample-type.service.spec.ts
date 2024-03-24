import { TestBed } from '@angular/core/testing';

import { SampleTypeService } from './sample-type.service';

describe('SampleTypeService', () => {
  let service: SampleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
