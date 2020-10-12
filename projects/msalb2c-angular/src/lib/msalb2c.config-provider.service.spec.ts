import { TestBed } from '@angular/core/testing';
import { MsalB2CConfigProviderService } from './msalb2c.config-provider.service';


describe('MsalB2CConfigProviderService', () => {
	let service: MsalB2CConfigProviderService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MsalB2CConfigProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
