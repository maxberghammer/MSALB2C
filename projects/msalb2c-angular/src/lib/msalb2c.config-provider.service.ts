import { Injectable } from '@angular/core';
import { BrowserCacheLocation, Configuration, LogLevel } from '@azure/msal-browser';
import { InteractionType } from './constants';
import { MsalB2CConfig } from './msalb2c.config';
import { MsalB2CConfigTools } from './msalb2c.config-tools';
import { MsalB2CGuardConfig } from './msalb2c.guard.config';
import { MsalB2CInterceptorConfig } from './msalb2c.interceptor.config';
import { MsalB2CRedirectComponent } from './msalb2c.redirect.component';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CConfigProviderService {

	constructor(private msalB2CConfig: MsalB2CConfig) { }

	public GetMsalConfig(): Configuration {
		const baseAuthority = "https://" + this.msalB2CConfig.tenantName + ".b2clogin.com/" + this.msalB2CConfig.tenantName + ".onmicrosoft.com/";
		const signinAuthority = baseAuthority + this.msalB2CConfig.signInFlowName;
		const signupAuthority = baseAuthority + this.msalB2CConfig.signUpFlowName;
		const pwdResetAuthority = baseAuthority + this.msalB2CConfig.passwordResetFlowName;
		const profEditAuthority = baseAuthority + this.msalB2CConfig.profileEditFlowName;

		return {
			auth: {
				authority: signinAuthority,
				knownAuthorities: [
					signinAuthority,
					signupAuthority,
					pwdResetAuthority,
					profEditAuthority
				],
				clientId: this.msalB2CConfig.applicationId,
				redirectUri: window.location.origin + "/" + MsalB2CRedirectComponent.Path,
				postLogoutRedirectUri: window.location.origin + "/" + MsalB2CRedirectComponent.Path,
				navigateToLoginRequestUrl: this.msalB2CConfig.interactionType === InteractionType.REDIRECT
			},
			cache: {
				cacheLocation: this.msalB2CConfig.cacheLocation ?? BrowserCacheLocation.LocalStorage,
				storeAuthStateInCookie: true
			},
			system: {
				loggerOptions: {
					logLevel: LogLevel.Verbose,
					piiLoggingEnabled: true,
					loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
						console.log(message);
					}
				}
			}
		};
	}

	public GetGuardConfig(): MsalB2CGuardConfig {
		return {
			interactionType: this.msalB2CConfig.interactionType
		}
	}

	public GetInterceptorConfig(): MsalB2CInterceptorConfig {
		// Autorisierungs-Scopes für geschützte Resourcen setzen
		const protectedResourceMap = new Map<string, string[]>();

		for (const apiAccessDefinition of this.msalB2CConfig.apiAccessDefinitions) {
			let scopeUrls: string[] = apiAccessDefinition.scopeNames.map(scopeName => MsalB2CConfigTools.getScopeUrl(this.msalB2CConfig, apiAccessDefinition, scopeName));
			protectedResourceMap.set(apiAccessDefinition.apiUrl, scopeUrls);
		}

		return {
			interactionType: this.msalB2CConfig.interactionType,
			protectedResourceMap,
			autoLogin: !this.msalB2CConfig.noAutoLogin
		}
	}
}
