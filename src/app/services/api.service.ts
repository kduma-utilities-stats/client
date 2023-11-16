import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }


  status(){
    return this.httpClient.get<StatusResponse>(this.getUrl('/api/status'),
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

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export interface StatusResponse {
  version: string;
  laravel: string;
  authenticated: boolean;
  user: UserResponse | null;
}

export interface TokenResponse {
  token: string;
}
