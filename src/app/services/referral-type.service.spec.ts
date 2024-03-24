import { TestBed } from '@angular/core/testing';

import { ReferralTypeService } from './referral-type.service';

describe('ReferralTypeService', () => {
  let service: ReferralTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferralTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
