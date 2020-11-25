import { Injectable } from '@angular/core';
import { BrowserCacheLocation } from '@azure/msal-browser';
import { InteractionType } from './constants';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CConfig {
	applicationId: string;
	tenantName: string;
	signInFlowName: string;
	signUpFlowName: string;
	passwordResetFlowName: string;
	profileEditFlowName: string;
	apiAccessDefinitions: MsalB2CApiAccessDefinition[];
	interactionType: InteractionType.POPUP | InteractionType.REDIRECT;
	noAutoLogin?: boolean;
	cacheLocation?: BrowserCacheLocation;
}

export class MsalB2CApiAccessDefinition {
	apiUrl: string;
	apiAppIdUriSuffix: string;
	scopeNames: string[];
}