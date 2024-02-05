import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface environmentConfig{
  env:string|null,
  port:number|null,
  baseUrl:string
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  constructor(private http:HttpClient) { }
  
  private envConfig:environmentConfig={
    env:null,
    port:null,
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
