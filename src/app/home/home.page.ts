import {Component, inject, OnInit} from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import {ConfigService} from "../services/config.service";
import {ApiService, UserResponse} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  private data = inject(DataService);
  user: UserResponse | null = null;

  constructor(
    public configService: ConfigService,
    protected apiService: ApiService,
    protected router: Router
  ) { }

  async ngOnInit() {
    if (this.configService.user() === null) {
      await this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }
  }

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
