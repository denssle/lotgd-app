import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintabPageRoutingModule } from './maintab-routing.module';

import { MaintabPage } from './maintab.page';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaintabPageRoutingModule,
        SharedModule
    ],
  declarations: [MaintabPage, MainMenuComponent]
})
export class MaintabPageModule {}
