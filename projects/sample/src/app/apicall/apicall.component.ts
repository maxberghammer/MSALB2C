import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-apicall',
  templateUrl: './apicall.component.html',
  styleUrls: ['./apicall.component.css']
})
export class ApiCallComponent implements OnInit {
  apiCallResult;

  constructor(
    private http: HttpClient, 
    private configService:ConfigService) { }

  ngOnInit() {
    // Call the secured API here
    this.http.get(this.configService.config.myApi + "/Authorization/displayinfo")
      .subscribe(result => {
        this.apiCallResult = JSON.stringify(result);
      });
  }
}
