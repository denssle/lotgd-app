import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'navtab',
        loadChildren: () => import('../navtab/navtab.module').then(m => m.NavtabPageModule)
      },
      {
        path: 'maintab',
        loadChildren: () => import('../maintab/maintab.module').then(m => m.MaintabPageModule)
      },
      {
        path: 'statstab',
        loadChildren: () => import('../statstab/statstab.module').then(m => m.StatstabPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
