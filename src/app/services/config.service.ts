import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _apiUrl: string|null = null;
  private _apiToken: string|null = null;

  constructor() {
    this.load().then(r => console.log(r));
  }

  async load() {
    let { value: _apiToken} = await Preferences.get({key: 'api_token'});
    this._apiToken = _apiToken;

    let { value: _apiUrl} = await Preferences.get({key: 'api_endpoint'});
    this._apiUrl = _apiUrl;
  }

  get apiUrl(): string {
    if(this._apiUrl === null){
      throw new Error('API URL is not set');
    }

    return this._apiUrl;
  }

  set apiUrl(value: string|null) {
    this._apiUrl = value;

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
    if(this._apiToken === null){
      throw new Error('API Token is not set');
    }

    return this._apiToken;
  }

  set apiToken(value: string|null) {
    this._apiToken = value;

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

  get isConfigured(): Boolean {
    return this._apiUrl !== null && this._apiToken !== null;
  }
}
