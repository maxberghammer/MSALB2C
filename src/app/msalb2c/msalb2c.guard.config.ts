import { PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { InteractionType } from "./constants";

export type MsalB2CGuardConfig = {
	interactionType: InteractionType.POPUP | InteractionType.REDIRECT;
	authRequest?: PopupRequest | RedirectRequest;
}
