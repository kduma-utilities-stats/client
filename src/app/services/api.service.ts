import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  async refreshUser() {
    try {
      let response = await firstValueFrom(this.status());

      if (!response.authenticated) {
        this.configService.user.set(null);
        this.configService.apiToken = null;
        return;
      }

      this.configService.user.set(response.user);
    } catch (e) {
      this.configService.user.set(null);
      this.configService.apiToken = null;
    }
  }

  status(){
    return this.httpClient.get<StatusResponse>(this.getUrl('/api/status'),
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ this.configService.apiToken,
        }
      });
  }

  getMeters(){
    return this.httpClient.get<GetMetersResponse>(this.getUrl('/api/meter'),
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ this.configService.apiToken,
        }
      });
  }

  getMeter(id: string){
    return this.httpClient.get<GetMeterResponse>(this.getUrl('/api/meter/'+id),
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ this.configService.apiToken,
        }
      });
  }

  deleteMeter(id: string) {
    return this.httpClient.delete<GetMeterResponse>(this.getUrl('/api/meter/'+id),
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ this.configService.apiToken,
        }
      });
  }

  logout(){
    return this.httpClient.post(this.getUrl('/api/logout'),
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ this.configService.apiToken,
        }
      });
  }

  login(url: string, email: string, password: string, deviceName: string){
    return this.httpClient.post<TokenResponse>(
      url + '/api/login',
      {
        email: email,
        password: password,
        device_name: deviceName
      },
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );
  }

  register(url: string, name: string, email: string, password: string, password_confirmation: string, deviceName: string){
    return this.httpClient.post<TokenResponse>(
      url + '/api/register',
      {
        email: email,
        name: name,
        password: password,
        password_confirmation: password_confirmation,
        device_name: deviceName
      },
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );
  }


  private getUrl(path: string) {
    return this.configService.apiUrl + path;
  }
}

export interface UserResource {
  id: string;
  name: string;
  email: string;
}

export interface MeterResource {
  id: string;
  name: string;
  user_id: string;
}

export interface CounterResource {
  id: string;
  name: string | null;
  barcode: string | null;
  meter_id: string;
}

export interface ReadingResource {
  id: string;
  user_id: string;
  performed_on: string;
  notes: string | null;
}

export interface ValueResource {
  id: string;
  reading_id: string;
  counter_id: string;
  value: number;
  notes: string | null;
}

export interface StatusResponse {
  version: string;
  laravel: string;
  authenticated: boolean;
  user: UserResource | null;
}

export interface TokenResponse {
  token: string;
}

export interface GetMetersResponse {
  data: MeterResource[];
}

export interface GetMeterResponse {
  data: MeterResource;
}
