import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigService } from './config.service';

import { HttpClientModule } from '@angular/common/http';
import { TestredirectComponent } from './testredirect/testredirect.component';
import { MsalB2CModule, MsalB2CConfig, InteractionType } from './msalb2c';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TestredirectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MsalB2CModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService:ConfigService) => async () => {
        await configService.loadConfig();
      },
      deps: [ConfigService],
      multi: true
    },
    {
      provide: MsalB2CConfig,
      useFactory: (configService:ConfigService) : MsalB2CConfig => {
        return {
          applicationId: "d31827a4-24b5-4545-b1c5-76e1327b7e8c",
          tenantName: configService.config.msal.tenant,
          signInFlowName: "b2c_1_signin",
          signUpFlowName: "b2c_1_signup",
          passwordResetFlowName: "b2c_1_pwdreset",
          profileEditFlowName: "b2c_1_profedit",
          interactionType: InteractionType.REDIRECT,
          apiAccessDefinitions: [
            {
              apiUrl: configService.config.catalogApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.analyticsApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.protocolApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.migrationApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.searchApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.naturalLanguageProcessingApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.importApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.exportApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
            {
              apiUrl: configService.config.accountApi,
              apiAppIdUriSuffix: configService.config.msal.middlewareAppIdUriSuffix,
              scopeNames: [configService.config.msal.apiAccessScope]
            },
          ]
        }
      },
      deps: [ConfigService]
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
