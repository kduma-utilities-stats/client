import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {MeterListItemComponent} from "./meter-list-item.component";

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [MeterListItemComponent],
  exports: [MeterListItemComponent]
})
export class MeterListItemComponentModule {}
