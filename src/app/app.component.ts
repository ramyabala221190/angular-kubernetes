import { Component } from '@angular/core';
import { EnvironmentConfigService, environmentConfig } from './environment-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kubernetes-angular';

  constructor(private envConfigService:EnvironmentConfigService){}

  config:environmentConfig={env:"",production:false,baseUrl:""}

  ngOnInit(){
    this.config=this.envConfigService.fetchEnvConfig();
    }
}
