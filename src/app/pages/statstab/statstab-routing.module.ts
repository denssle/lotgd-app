import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatstabPage } from './statstab.page';

const routes: Routes = [
  {
    path: '',
    component: StatstabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatstabPageRoutingModule {}
