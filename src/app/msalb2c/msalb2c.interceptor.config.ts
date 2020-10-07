import { InteractionType } from "./constants";
import { PopupRequest, RedirectRequest } from '@azure/msal-browser';

export type MsalB2CInterceptorConfig = {
    interactionType: InteractionType.POPUP | InteractionType.REDIRECT;
    protectedResourceMap: Map<string, Array<string>>;
    authRequest?: PopupRequest | RedirectRequest;
}
