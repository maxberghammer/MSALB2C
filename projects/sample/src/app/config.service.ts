import { Injectable } from '@angular/core';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config:Config;

  constructor() { }

  public async loadConfig(){
    // If you want to load the config from a custom middleware, you have to use fetch-api or something else but HttpClient, otherwise you'll get a cyclic dependency
    // var resp = await fetch("https://dev.ade.adesystem.net/api/v3/configuration");
    // this.config = await resp.json() as Config;

    this.config = {
      // Set the URL of the secured API. e.g: https://myapi.my.domain/api/v1
      myApi: "https://account.dev.ade.adesystem.net/api/v3",
      // Set the suffix of the Application ID URI. This can be found on the "Overview"-Blade of the B2C-Application hosting the secured API: https://<TENANT>.onmicrosoft.com/<APPIDURISUFFIX>
      myApiAppIdUriSuffix: "adedevmiddleware",
      // Set the scope to use to access the secured API. This can be found on the "Expose an API" of the B2C-Application hosting the secured API: https://<TENANT>.onmicrosoft.com/<APPIDURISUFFIX>/<SCOPENAME>
      myApiAccessScopeName: "user_impersonation",
      
      msal: {
        // Set the applicationId of the SPA-Application. The SPA-Application must be configured to have access to the secured API.
        applicationId: "7af93516-739c-4ad6-892d-18fc1f91cee3",
        // Set the name of the tenant. This is the prefix of the tenant domain-name in the B2C "Overview"-blade: <TENANT>.onmicrosoft.com
        tenant: "orcaidentitydev",
        // Set the name of the signin-flow. This can be found on the "User flows"-blade of B2C.
        signInFlow: "b2c_1_signin",
        // Set the name of the signup-flow. This can be found on the "User flows"-blade of B2C.
        signUpFlow: "b2c_1_signup",
        // Set the name of the passwordreset-flow. This can be found on the "User flows"-blade of B2C.
        passwordResetFlow: "b2c_1_pwdreset",
        // Set the name of the profileedit-flow. This can be found on the "User flows"-blade of B2C.
        profileEditFlow: "b2c_1_profedit"
      }
    }
  }
}
