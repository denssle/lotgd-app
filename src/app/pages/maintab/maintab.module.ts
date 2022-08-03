import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintabPageRoutingModule } from './maintab-routing.module';

import { MaintabPage } from './maintab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintabPageRoutingModule
  ],
  declarations: [MaintabPage]
})
export class MaintabPageModule {}
