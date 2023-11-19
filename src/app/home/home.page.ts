import {Component, inject} from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../components/message/message.component';

import { DataService, Message } from '../services/data.service';
import {ConfigService} from "../services/config.service";
import {ApiService, UserResource} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage   {
  private data = inject(DataService);
  user: UserResource | null = null;

  constructor(
    public configService: ConfigService,
    protected apiService: ApiService,
    protected router: Router
  ) { }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  logOut() {
    this.apiService.logout()
      .subscribe(async (response) => {
        this.configService.apiToken = null;
        await this.apiService.refreshUser();
        await this.router.navigate(['/login'], { replaceUrl: true });
      });
  }
}
