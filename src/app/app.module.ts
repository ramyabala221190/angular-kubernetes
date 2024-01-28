import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import { EnvironmentConfigService } from './environment-config.service';

function appInitialization(envConfigService:EnvironmentConfigService) :()=>Observable<any>{
  return ()=>envConfigService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:APP_INITIALIZER,
      useFactory:appInitialization,
      deps:[EnvironmentConfigService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
