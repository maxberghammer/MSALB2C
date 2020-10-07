import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { MsalB2CService } from './msalb2c.service';
import { Minimatch } from "minimatch";
import { AuthenticationResult } from "@azure/msal-browser";
import { Injectable, Inject } from '@angular/core';
import { MSALB2C_INTERCEPTOR_CONFIG, InteractionType } from './constants';
import { MsalB2CInterceptorConfig } from './msalb2c.interceptor.config';
import { ResponseMode } from "@azure/msal-common";

@Injectable()
export class MsalB2CInterceptor implements HttpInterceptor {
    constructor(
        @Inject(MSALB2C_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalB2CInterceptorConfig,
        private msalB2CService: MsalB2CService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const scopes = this.getScopesForEndpoint(req.url);
        const account = this.msalB2CService.getAllAccounts()[0];

        if (!scopes || scopes.length === 0) {
            return next.handle(req);
        }

        // Note: For MSA accounts, include openid scope when calling acquireTokenSilent to return idToken
        return this.msalB2CService.acquireTokenSilent({scopes:scopes, account:account})
            .pipe(
                catchError(() => {
                    if (this.msalInterceptorConfig.interactionType === InteractionType.POPUP) {
                        return this.msalB2CService.acquireTokenPopup({...this.msalInterceptorConfig.authRequest, scopes})
                    }
                    const redirectStartPage = window.location.href;
                    this.msalB2CService.acquireTokenRedirect({...this.msalInterceptorConfig.authRequest, scopes, redirectStartPage, responseMode: ResponseMode.FRAGMENT});
                    return EMPTY;
                }),
                switchMap((result: AuthenticationResult) => {
                    const headers = req.headers
                        .set('Authorization', `Bearer ${result.accessToken}`)

                    const requestClone = req.clone({headers});
                    return next.handle(requestClone);
                })
            )

    }

    private getScopesForEndpoint(endpoint: string): Array<string>|null {
        const protectedResourcesArray = Array.from(this.msalInterceptorConfig.protectedResourceMap.keys());
        const keyMatchesEndpointArray = protectedResourcesArray.filter(key => {
            const minimatch = new Minimatch(key);
            return minimatch.match(endpoint) || endpoint.indexOf(key) > -1;
        });
        
        // process all protected resources and send the first matched resource
        if (keyMatchesEndpointArray.length > 0) {
            const keyForEndpoint = keyMatchesEndpointArray[0];
            if (keyForEndpoint) {
                return this.msalInterceptorConfig.protectedResourceMap.get(keyForEndpoint);
            }
        } 

        return null;
    }
    
}
