import { PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { InteractionType } from "./constants";

export type MsalB2CInterceptorConfig = {
	interactionType: InteractionType.POPUP | InteractionType.REDIRECT;
	protectedResourceMap: Map<string, Array<string>>;
	authRequest?: PopupRequest | RedirectRequest;
	autoLogin: boolean;
}
