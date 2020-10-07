import { InteractionType } from "./constants";
import { PopupRequest, RedirectRequest } from '@azure/msal-browser';

export type MsalB2CGuardConfig = {
    interactionType: InteractionType.POPUP | InteractionType.REDIRECT;
    authRequest?: PopupRequest | RedirectRequest;
}
