import {Component, OnInit} from '@angular/core';
import { ConfigService } from "./services/config.service";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public configService: ConfigService,
    public apiService: ApiService,
  ) {

  }
  async ngOnInit() {
    await this.configService.load();
    if (!this.configService.isConfigured()) {
      return;
    }

    await this.apiService.refreshUser();
  }
}
