import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    public apiService: ApiService,
    public platform: Platform
  ) { }

  ngOnInit() {

  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Meters' : '';
  }
}
