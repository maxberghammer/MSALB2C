import { Injectable } from '@angular/core';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config:Config;

  constructor() { }

  public async loadConfig(){
    var resp = await fetch("https://dev.ade.adesystem.net/api/v3/configuration");
    this.config = await resp.json() as Config;
  }
}
