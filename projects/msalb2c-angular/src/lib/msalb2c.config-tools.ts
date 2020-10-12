import { MsalB2CApiAccessDefinition, MsalB2CConfig } from './msalb2c.config';

export class MsalB2CConfigTools {
	public static getScopeUrl(msalB2CConfig: MsalB2CConfig, msalB2CApiAccessDefinition: MsalB2CApiAccessDefinition, scopeName: string): string {
		return "https://" + msalB2CConfig.tenantName + ".onmicrosoft.com/" + msalB2CApiAccessDefinition.apiAppIdUriSuffix + "/" + scopeName;
	}
}