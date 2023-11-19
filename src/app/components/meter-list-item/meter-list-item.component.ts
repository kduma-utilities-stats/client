import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AlertController, Platform} from "@ionic/angular";
import {MeterResource} from "../../services/api.service";

@Component({
  selector: 'app-meter-list-item',
  templateUrl: './meter-list-item.component.html',
  styleUrls: ['./meter-list-item.component.scss'],
})
export class MeterListItemComponent {
  private platform = inject(Platform);
  @Input() meter?: MeterResource;
  @Output() deleted = new EventEmitter<void>();

  constructor(private alertController: AlertController) {}

  isIos() {
    return this.platform.is('ios')
  }

  protected readonly alert = alert;

  async delete() {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to delete "'+this.meter?.name+'" meter?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.deleted.emit();
          },
        },
      ],
    });

    await alert.present();
  }
}
