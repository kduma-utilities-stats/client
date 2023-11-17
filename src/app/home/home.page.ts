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
    protected configService: ConfigService,
    protected apiService: ApiService,
    protected router: Router
  ) { }

  async ngOnInit() {
    if (!this.configService.isConfigured) {
      await this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.apiService.status().subscribe((response) => {
      if(!response.authenticated){
        this.router.navigate(['/login'], { replaceUrl: true });
        return;
      }

      this.user = response.user;
    });
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
        await this.router.navigate(['/login'], { replaceUrl: true });
      });
  }
}
