import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalB2CRedirectComponent } from './msalb2c.redirect.component';


describe('MsalB2CRedirectComponent', () => {
	let component: MsalB2CRedirectComponent;
	let fixture: ComponentFixture<MsalB2CRedirectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MsalB2CRedirectComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MsalB2CRedirectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
