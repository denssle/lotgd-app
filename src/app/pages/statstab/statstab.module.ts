import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatstabPageRoutingModule } from './statstab-routing.module';

import { StatstabPage } from './statstab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatstabPageRoutingModule
  ],
  declarations: [StatstabPage]
})
export class StatstabPageModule {}
