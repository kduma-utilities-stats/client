import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Platform} from "@ionic/angular";
import {ApiService, MeterResource} from "../../../services/api.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public meter: MeterResource | undefined;

  constructor(
    public apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public platform: Platform
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.apiService.getMeter(id).subscribe(
      (response) => {
        this.meter = response.data;
      });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Meters' : '';
  }
}
