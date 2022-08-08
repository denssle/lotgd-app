import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NavtabPageRoutingModule} from './navtab-routing.module';

import {NavtabPage} from './navtab.page';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NavtabPageRoutingModule,
        SharedModule
    ],
  declarations: [NavtabPage, NavMenuComponent]
})
export class NavtabPageModule {
}
