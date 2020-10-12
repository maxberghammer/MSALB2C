import { Component, OnInit } from '@angular/core';
import { MsalB2CService } from 'msalb2c-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 10 - MSAL Browser Sample';
  isIframe = false;
  loggedIn = false;

  constructor(
    private msalB2CService: MsalB2CService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    setInterval(()=>this.checkAccount(), 1000);
  }

  checkAccount() {
    this.loggedIn = this.msalB2CService.isLoggedIn();
  }

  async login() {
    try {
      await this.msalB2CService.login();
    }
    catch(error) {
      console.log(error);
    }
  }

  async logout() {
    await this.msalB2CService.logout();
  }
}
