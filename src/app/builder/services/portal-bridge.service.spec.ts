import { TestBed } from '@angular/core/testing';

import { PortalBridgeService } from './portal-bridge.service';

describe('PortalBridgeService', () => {
  let service: PortalBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
