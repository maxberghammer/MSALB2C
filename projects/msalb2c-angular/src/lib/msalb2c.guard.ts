import { Location } from "@angular/common";
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthError } from '@azure/msal-browser';
import { MSALB2C_GUARD_CONFIG } from './constants';
import { MsalB2CGuardConfig } from './msalb2c.guard.config';
import { MsalB2CService } from './msalb2c.service';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CGuard implements CanActivate {
	constructor(
		@Inject(MSALB2C_GUARD_CONFIG) private msalGuardConfig: MsalB2CGuardConfig,
		private msalB2CService: MsalB2CService,
		private location: Location
	) { }

	/**
	 * Builds the absolute url for the destination page
	 * @param path Relative path of requested page
	 * @returns Full destination url
	 */
	getDestinationUrl(path: string): string {
		// Absolute base url for the application (default to origin if base element not present)
		const baseElements = document.getElementsByTagName("base");
		const baseUrl = this.location.normalize(baseElements.length ? baseElements[0].href : window.location.origin);

		// Path of page (including hash, if using hash routing)
		const pathUrl = this.location.prepareExternalUrl(path);

		// Hash location strategy
		if (pathUrl.startsWith("#")) {
			return `${baseUrl}/${pathUrl}`;
		}

		// If using path location strategy, pathUrl will include the relative portion of the base path (e.g. /base/page).
		// Since baseUrl also includes /base, can just concatentate baseUrl + path
		return `${baseUrl}${path}`;
	}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		try {
			await this.msalB2CService.handleRedirect();

			if (this.msalB2CService.isLoggedIn()) {
				return true;
			}

			try {
				await this.msalB2CService.loginEx(this.getDestinationUrl(state.url), this.msalGuardConfig.interactionType, this.msalGuardConfig.authRequest);

				return true;
			}
			catch (e) {
				return false;
			}
		}
		catch (e) {
			const error: AuthError = e;

			if (this.msalB2CService.handleResetPassword(error)){
				return false;
			}

			if (this.msalB2CService.handleCancelProfileEdit(error)){
				return true;
			}

			return false;
		}
	}

}
