import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavtabPageRoutingModule } from './navtab-routing.module';

import { NavtabPage } from './navtab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavtabPageRoutingModule
  ],
  declarations: [NavtabPage]
})
export class NavtabPageModule {}
