import { TestBed } from '@angular/core/testing';

import { SwitcherPortalService } from './switcher-portal.service';

describe('SwitcherPortalService', () => {
  let service: SwitcherPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitcherPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
