import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSALB2C_GUARD_CONFIG, MSAL_INSTANCE, MSALB2C_INTERCEPTOR_CONFIG } from './constants';
import { MsalB2CConfigProviderService } from './msalb2c.config-provider.service';
import { MsalB2CGuard } from './msalb2c.guard';
import { MsalB2CGuardConfig } from './msalb2c.guard.config';
import { MsalB2CInterceptor } from './msalb2c.interceptor';
import { MsalB2CInterceptorConfig } from './msalb2c.interceptor.config';
import { MsalB2CNoGuard } from './msalb2c.no-guard';
import { MsalB2CRedirectComponent } from './msalb2c.redirect.component';
import { MsalB2CService } from './msalb2c.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: MsalB2CRedirectComponent.Path,
				component: MsalB2CRedirectComponent,
				canActivate: [MsalB2CNoGuard]
			}])
	],
	providers: [
		MsalB2CConfigProviderService,		
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MsalB2CInterceptor,
			multi: true
		},
		{
			provide: MSAL_INSTANCE,
			useFactory: (msalB2CConfigProviderService: MsalB2CConfigProviderService): IPublicClientApplication =>
				new PublicClientApplication(msalB2CConfigProviderService.GetMsalConfig()),
			deps: [MsalB2CConfigProviderService]
		},
		{
			provide: MSALB2C_GUARD_CONFIG,
			useFactory: (msalB2CConfigProviderService: MsalB2CConfigProviderService): MsalB2CGuardConfig =>
				msalB2CConfigProviderService.GetGuardConfig(),
			deps: [MsalB2CConfigProviderService]
		},
		{
			provide: MSALB2C_INTERCEPTOR_CONFIG,
			useFactory: (msalB2CConfigProviderService: MsalB2CConfigProviderService): MsalB2CInterceptorConfig =>
				msalB2CConfigProviderService.GetInterceptorConfig(),
			deps: [MsalB2CConfigProviderService]
		},
		MsalB2CService,
		MsalB2CGuard,
		MsalB2CNoGuard
	]
})
export class MsalB2CModule {
}
