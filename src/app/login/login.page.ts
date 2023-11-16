import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {ApiService, TokenResponse} from "../services/api.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isRegistration = false;
  public url: string = '';
  public email: string = '';
  public name: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public device_name: string = '';

  constructor(
    protected configService: ConfigService,
    protected apiService: ApiService,
    protected router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.setTestData();

    try {
      this.url = this.configService.apiUrl;
    } catch (e) {
      console.log(e);
    }
  }

  private setTestData() {
    this.url = 'http://utilities-stats.test';
    this.email = 'test@example.com';
    this.name = 'John Doe';
    this.password = 'password';
    this.password_confirmation = 'password';
    this.device_name = 'My Device';
  }

  login() {
    this.apiService.login(this.url, this.email, this.password, this.device_name)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(async (response: TokenResponse | Observable<never>) => {
        if (response instanceof Observable) {
          return;
        }

        this.configService.apiUrl = this.url;
        this.configService.apiToken = response.token;
        await this.router.navigate(['/']);
      });
  }

  register() {
    this.apiService.register(this.url, this.name, this.email, this.password, this.password_confirmation, this.device_name)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(async (response: TokenResponse | Observable<never>) => {
        if (response instanceof Observable) {
          return;
        }

        this.configService.apiUrl = this.url;
        this.configService.apiToken = response.token;
        await this.router.navigate(['/']);
      });
  }

  protected async errorHandler(error: HttpErrorResponse) {
    if (error.status === 409) {
      this.isRegistration = true;

      const alert = await this.alertController.create({
        header: 'Registration',
        message: 'No user is registered in the system, please register first.',
        buttons: ['OK'],
      });

      await alert.present();

      return throwError(() => new Error('No user is registered in the system, please register.'));
    }

    if (error.status === 422) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.error.message,
        buttons: ['OK'],
      });

      await alert.present();

      return throwError(() => new Error(error.error.message));
    }

    if (error.status === 404) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'The server could not be found. Please check the URL and try again.',
        buttons: ['OK'],
      });

      await alert.present();

      return throwError(() => new Error('The server could not be found. Please check the URL and try again.'));
    }

    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Something bad happened; please try again later.',
      buttons: ['OK'],
    });

    await alert.present();

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
