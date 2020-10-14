import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiCallComponent } from './apicall/apicall.component';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';
import { TestredirectComponent } from './testredirect/testredirect.component';
import { MsalB2CModule, MsalB2CConfig, InteractionType } from '@whiteduck/msalb2c-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApiCallComponent,
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
    // Import the MsalB2CModule
    MsalB2CModule
  ],
  providers: [
    ConfigService,
    // Bootstrap the config-loader, so that the config is being loaded on application init
    {
      provide: APP_INITIALIZER,
      useFactory: (configService:ConfigService) => async () => {
        await configService.loadConfig();
      },
      deps: [ConfigService],
      multi: true
    },
    // Bootstrap the configuration for MsalB2C
    {
      provide: MsalB2CConfig,
      useFactory: (configService:ConfigService) : MsalB2CConfig => {
        return {
          // You can change this to POPUP if you want, buth then some things won't work, as popups are being blocked by default if they are not a result of a user-interaction.
          // If you want to secure the start-page of your SPA with MsalB2CGuard, for example, the popup will be blocked.
          interactionType: InteractionType.REDIRECT,
          applicationId: configService.config.msal.applicationId,
          tenantName: configService.config.msal.tenant,
          signInFlowName: configService.config.msal.signInFlow,
          signUpFlowName: configService.config.msal.signUpFlow,
          passwordResetFlowName: configService.config.msal.passwordResetFlow,
          profileEditFlowName: configService.config.msal.profileEditFlow,
          apiAccessDefinitions: [
            {
              apiUrl: configService.config.myApi,
              apiAppIdUriSuffix: configService.config.myApiAppIdUriSuffix,
              scopeNames: [configService.config.myApiAccessScopeName]
            }
          ]
        }
      },
      deps: [ConfigService]
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
