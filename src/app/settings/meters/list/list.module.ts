import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import {MessageComponentModule} from "../../../components/message/message.module";
import {MeterListItemComponentModule} from "../../../components/meter-list-item/meter-list-item.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    MessageComponentModule,
    MeterListItemComponentModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
