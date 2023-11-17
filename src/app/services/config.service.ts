import {computed, Injectable, Signal, signal} from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import {UserResponse} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _apiUrl = signal<string|null>(null);
  private _apiToken = signal<string|null>(null);
  isConfigured: Signal<boolean> = computed(() => this._apiUrl() !== null && this._apiToken() !== null);
  user = signal<UserResponse | null>(null)

  constructor() {
    this.load().then(r => console.log(r));
  }

  async load() {
    let { value: _apiToken} = await Preferences.get({key: 'api_token'});
    this._apiToken.set(_apiToken);

    let { value: _apiUrl} = await Preferences.get({key: 'api_endpoint'});
    this._apiUrl.set(_apiUrl);
  }

  get apiUrl(): string {
    const apiUrl = this._apiUrl();

    if(apiUrl === null){
      throw new Error('API URL is not set');
    }

    return apiUrl;
  }

  set apiUrl(value: string|null) {
    this._apiUrl.set(value);

    if(value === null){
      Preferences.remove({
        key: 'api_endpoint'
      }).then(r => console.log(r));
    } else {
      Preferences.set({
        key: 'api_endpoint',
        value: value,
      }).then(r => console.log(r));
    }
  }

  get apiToken(): string {
    const apiToken = this._apiToken();
    if(apiToken === null){
      throw new Error('API Token is not set');
    }

    return apiToken;
  }

  set apiToken(value: string|null) {
    this._apiToken.set(value);

    if(value === null){
      Preferences.remove({
        key: 'api_token'
      }).then(r => console.log(r));
    } else {
      Preferences.set({
        key: 'api_token',
        value: value,
      }).then(r => console.log(r));
    }
  }
}
