import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import configJson from '../assets/json/config.json';

import * as configu from '../assets/json/config.json';

export interface environmentConfig{
  env:string|null,
  baseUrl:string,
  production:boolean
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  constructor(private http:HttpClient) { }
  
  private envConfig:environmentConfig={
    env:"",
    production:false,
    baseUrl:""
  }

  loadConfig(){
    console.log("Imported config.json",configJson)
    console.log("Imported config.json",configu)
     console.log("Checking contents of environment.ts file : ",environment);
     return this.http.get('/assets/json/config.json').pipe(
      tap((config:any)=>{
        console.log(config);
          this.envConfig=config;
      })
     )
  }

  fetchEnvConfig(){
    return this.envConfig;
  }

 
}
