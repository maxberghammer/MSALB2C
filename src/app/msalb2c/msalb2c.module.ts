import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import {MsalConfigProviderService} from './msal.config-provider.service'
import { MsalB2CInterceptor } from './msalb2c.interceptor';
import {MSALB2C_GUARD_CONFIG, MSALB2C_INSTANCE, MSALB2C_INTERCEPTOR_CONFIG} from './constants'
import { MsalB2CGuardConfig } from './msalb2c.guard.config';
import { MsalB2CInterceptorConfig } from './msalb2c.interceptor.config';
import { MsalB2CService } from './msalb2c.service';
import { MsalB2CGuard } from './msalb2c.guard';
import { MsalB2CNoGuard } from './msalb2c.no-guard';
import { RouterModule } from '@angular/router';
import { MsalB2CRedirectComponent } from './redirect/msalb2c.redirect.component';

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
    MsalConfigProviderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalB2CInterceptor,
      multi: true
    },
    {
      provide: MSALB2C_INSTANCE,
      useFactory: (msalConfigProviderService:MsalConfigProviderService) : IPublicClientApplication => 
        new PublicClientApplication(msalConfigProviderService.GetConfig()),
      deps: [MsalConfigProviderService]
    },
    {
      provide: MSALB2C_GUARD_CONFIG,
      useFactory: (msalConfigProviderService:MsalConfigProviderService) : MsalB2CGuardConfig => 
      msalConfigProviderService.GetGuardConfig(),
      deps: [MsalConfigProviderService]
    },
    {
      provide: MSALB2C_INTERCEPTOR_CONFIG,
      useFactory: (msalConfigProviderService:MsalConfigProviderService) : MsalB2CInterceptorConfig => 
      msalConfigProviderService.GetInterceptorConfig(),
      deps: [MsalConfigProviderService]
    },
    MsalB2CService,
    MsalB2CGuard,
    MsalB2CNoGuard
  ]
})
export class MsalB2CModule { 

}
