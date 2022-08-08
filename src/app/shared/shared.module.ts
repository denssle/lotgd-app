import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralMenuComponent} from './general-menu/general-menu.component';


@NgModule({
  declarations: [GeneralMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ], exports: [
    GeneralMenuComponent
  ]
})
export class SharedModule {
}
