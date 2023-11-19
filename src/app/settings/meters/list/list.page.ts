import { Component, OnInit } from '@angular/core';
import {ApiService, MeterResource} from "../../../services/api.service";
import {RefresherCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public meters: MeterResource[] | undefined;

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getMeters().subscribe(
      (response) => {
        this.meters = response.data;
      });
  }

  refresh($event: any) {
    setTimeout(() => {
      this.apiService.getMeters().subscribe((response) => {
          this.meters = response.data;
          ($event as RefresherCustomEvent).detail.complete();
        });
    }, 1000);
  }

  delete(meter: MeterResource) {
    this.apiService.deleteMeter(meter.id).subscribe(
      (response) => {
        this.apiService.getMeters().subscribe((response) => {
          this.apiService.getMeters().subscribe(
            (response) => {
              this.meters = response.data;
            });
        });
      });
  }
}
