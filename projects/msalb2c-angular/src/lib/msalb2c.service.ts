import { Inject, Injectable } from "@angular/core";
import { AccountInfo, AuthenticationResult, AuthError, AuthorizationUrlRequest, IPublicClientApplication, PopupRequest, RedirectRequest } from "@azure/msal-browser";
import { ResponseMode } from "@azure/msal-common";
import { EMPTY } from 'rxjs';
import { InteractionType, MSAL_INSTANCE } from "./constants";
import { MsalB2CConfig } from './msalb2c.config';
import { MsalB2CConfigTools } from './msalb2c.config-tools';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CService {

	constructor(
		@Inject(MSAL_INSTANCE) private msalB2CInstance: IPublicClientApplication,
		private msalB2CConfig: MsalB2CConfig
	) { }

	public login(): Promise<void | AuthenticationResult> {
		return this.invokeFlow(this.msalB2CConfig.signInFlowName);
	}

	public loginEx(redirectStartPage: string, interactionType: InteractionType, request?: AuthorizationUrlRequest): Promise<void | AuthenticationResult> {
		const authority = this.getAuthorityUrl(this.msalB2CConfig.signInFlowName);
		const scopes = this.getScopeUrls();

		if (interactionType === InteractionType.POPUP) {
			return this.msalB2CInstance.loginPopup({ ...request, authority, scopes });
		}
		else {
			return this.msalB2CInstance.loginRedirect({ ...request, authority, redirectStartPage, scopes });
		}
	}

	public logout(): Promise<void> {
		return this.msalB2CInstance.logout({ postLogoutRedirectUri: window.location.toString() });
	}

	public signUp(): Promise<void | AuthenticationResult> {
		return this.invokeFlow(this.msalB2CConfig.signUpFlowName);
	}

	public editUserProfile(): Promise<void | AuthenticationResult> {
		return this.invokeFlow(this.msalB2CConfig.profileEditFlowName);
	}

	public resetPwd(): Promise<void | AuthenticationResult> {
		return this.invokeFlow(this.msalB2CConfig.passwordResetFlowName);
	}

	public handleResetPassword(error: AuthError) {
		if (error.errorMessage.startsWith("AADB2C90118")) {
			this.resetPwd();
		}
	}

	public isLoggedIn(): boolean {
		return this.msalB2CInstance.getAllAccounts().length > 0;
	}

	public acquireTokenSilent(scopes: string[]): Promise<AuthenticationResult> {
		const account = this.getAllAccounts()[0];

		return this.msalB2CInstance.acquireTokenSilent({ account, scopes });
	}

	public acquireTokenInteractive(scopes: string[], interactionType: InteractionType, request: PopupRequest | RedirectRequest): Promise<void | AuthenticationResult> {
		if (interactionType === InteractionType.POPUP) {
			return this.msalB2CInstance.acquireTokenPopup({ ...request, scopes });
		}

		this.msalB2CInstance.acquireTokenRedirect({ ...request, scopes, redirectStartPage: window.location.href, responseMode: ResponseMode.FRAGMENT });
		return EMPTY.toPromise();
	}

	public acquireIdTokenSilent(): Promise<AuthenticationResult> {
		return this.acquireTokenSilent([this.msalB2CConfig.applicationId]);
	}

	public acquireIdTokenInteractive(interactionType: InteractionType, request: PopupRequest | RedirectRequest): Promise<void | AuthenticationResult> {
		return this.acquireTokenInteractive([this.msalB2CConfig.applicationId], interactionType, request);
	}

	public getAllAccounts(): AccountInfo[] {
		return this.msalB2CInstance.getAllAccounts();
	}

	public handleRedirect(): Promise<AuthenticationResult> {
		return this.msalB2CInstance.handleRedirectPromise();
	}

	private async invokeFlow(flowName: string): Promise<void | AuthenticationResult> {
		const authority = this.getAuthorityUrl(flowName);
		const scopes = this.getScopeUrls();

		// Login-Seite mit entsprechendem Flow aufrufen
		if (this.msalB2CConfig.interactionType === InteractionType.POPUP) {
			return await this.msalB2CInstance.loginPopup({
				authority,
				scopes
			});
		}
		else {
			return await this.msalB2CInstance.loginRedirect({
				authority,
				scopes,
				redirectStartPage: window.location.toString()
			});
		}
	}

	private getScopeUrls(): string[] {
		const scopes: string[] = [];

		this.msalB2CConfig.apiAccessDefinitions.forEach((apiAccessDefinition) => apiAccessDefinition.scopeNames.forEach((scopeName) => {
			const scopeUrl = MsalB2CConfigTools.getScopeUrl(this.msalB2CConfig, apiAccessDefinition, scopeName);

			if (!scopes.includes(scopeUrl)) {
				scopes.push(scopeUrl);
			}
		}));

		return scopes;
	}

	private getAuthorityUrl(flow: string): string {
		return "https://" + this.msalB2CConfig.tenantName + ".b2clogin.com/" + this.msalB2CConfig.tenantName + ".onmicrosoft.com/" + flow;
	}
}
