import { TestBed } from '@angular/core/testing';

import { CollectionSiteService } from './collection-site.service';

describe('CollectionSiteService', () => {
  let service: CollectionSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
