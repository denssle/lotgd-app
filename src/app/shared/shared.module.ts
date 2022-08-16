import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralMenuComponent} from './general-menu/general-menu.component';
import {DebugComponent} from './debug/debug.component';


@NgModule({
  declarations: [
    GeneralMenuComponent,
    DebugComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ], exports: [
    GeneralMenuComponent,
    DebugComponent
  ]
})
export class SharedModule {
}
