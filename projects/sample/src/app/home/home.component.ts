import { Component, OnInit } from '@angular/core';
import { MsalB2CService } from '@whiteduck/msalb2c-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;

  constructor(private msalB2CService: MsalB2CService) { 
  }

  ngOnInit(): void {
    setInterval(()=>this.checkAccount(), 1000);
  }

  checkAccount() {
    this.loggedIn = this.msalB2CService.isLoggedIn();
  }

  async editProfile() {
    await this.msalB2CService.editUserProfile();
  }
}
