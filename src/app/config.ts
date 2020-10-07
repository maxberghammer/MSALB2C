export interface Config {
	migrationApi?: string;
	webApi?: string;
	catalogApi?: string;
	analyticsApi?: string;
	protocolApi?: string;
	importApi?: string;
	exportApi?: string;
	searchApi?: string;
	naturalLanguageProcessingApi?: string;
	accountApi?: string;
	publishHub?: string;
	importHub?: string;
	msal?: MsalConfig;
}

export interface MsalConfig {
	clientId?: string;
	middlewareAppIdUriSuffix?: string;
	tenant?: string;
	signInFlow?: string;
	signUpFlow?: string;
	passwordResetFlow?: string;
	profileEditFlow?: string;
	apiAccessScope?: string;
}