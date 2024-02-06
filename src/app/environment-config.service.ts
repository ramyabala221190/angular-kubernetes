import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


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
