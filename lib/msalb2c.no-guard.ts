import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthError } from "@azure/msal-browser";
import { MsalB2CService } from './msalb2c.service';

@Injectable({
	providedIn: 'root'
})
export class MsalB2CNoGuard implements CanActivate {
	constructor(
		private msalB2CService: MsalB2CService
	) { }

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		try {
			await this.msalB2CService.handleRedirect();
		}
		catch (e) {
			const error: AuthError = e;

			this.msalB2CService.handleResetPassword(error);
		}

		return true;
	}

}