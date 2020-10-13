import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticationResult } from "@azure/msal-browser";
import { Minimatch } from "minimatch";
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MSALB2C_INTERCEPTOR_CONFIG } from './constants';
import { MsalB2CInterceptorConfig } from './msalb2c.interceptor.config';
import { MsalB2CService } from './msalb2c.service';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CInterceptor implements HttpInterceptor {
	constructor(
		@Inject(MSALB2C_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalB2CInterceptorConfig,
		private msalB2CService: MsalB2CService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const scopes = this.getScopesForEndpoint(req.url);

		if (!scopes || scopes.length === 0) {
			return next.handle(req);
		}

		// Note: For MSA accounts, include openid scope when calling acquireTokenSilent to return idToken
		return this.msalB2CService.acquireTokenSilent(scopes)
			.pipe(
				catchError(() => {
					return this.msalB2CService.acquireTokenInteractive(scopes, this.msalInterceptorConfig.interactionType, this.msalInterceptorConfig.authRequest);
				}),
				switchMap((result: AuthenticationResult) => {
					const headers = req.headers
						.set('Authorization', `Bearer ${result.accessToken}`)

					const requestClone = req.clone({ headers });
					return next.handle(requestClone);
				})
			)

	}

	private getScopesForEndpoint(endpoint: string): Array<string> | null {
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
