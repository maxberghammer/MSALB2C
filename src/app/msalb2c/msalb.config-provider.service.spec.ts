import { TestBed } from '@angular/core/testing';

import { MsalConfigProviderService } from './msal.config-provider.service';

describe('MsalB2CConfigProviderService', () => {
  let service: MsalConfigProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalConfigProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
