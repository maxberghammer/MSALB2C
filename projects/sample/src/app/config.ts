export interface Config {
	myApi?: string;
	myApiAppIdUriSuffix?: string;
	myApiAccessScopeName?: string;
	msal?: MsalConfig;
}

export interface MsalConfig {
	applicationId?: string;
	tenant?: string;
	signInFlow?: string;
	signUpFlow?: string;
	passwordResetFlow?: string;
	profileEditFlow?: string;
}