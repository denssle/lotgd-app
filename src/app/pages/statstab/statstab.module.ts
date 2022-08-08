import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StatstabPageRoutingModule} from './statstab-routing.module';

import {StatstabPage} from './statstab.page';
import {StatsMenuComponent} from './stats-menu/stats-menu.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StatstabPageRoutingModule,
        SharedModule
    ],
  declarations: [StatstabPage, StatsMenuComponent]
})
export class StatstabPageModule {
}
