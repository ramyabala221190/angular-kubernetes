import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface environmentConfig{
  env:string|null,
  port:number|null
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  constructor(private http:HttpClient) { }
  
  private envConfig:environmentConfig={
    env:null,
    port:null
  }

  loadConfig(){
     return this.http.get('/assets/config.json').pipe(
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
