import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintabPage } from './maintab.page';

const routes: Routes = [
  {
    path: '',
    component: MaintabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintabPageRoutingModule {}
