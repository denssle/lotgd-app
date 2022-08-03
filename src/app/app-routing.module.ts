import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'navtab',
    loadChildren: () => import('./pages/navtab/navtab.module').then(m => m.NavtabPageModule)
  },
  {
    path: 'maintab',
    loadChildren: () => import('./pages/maintab/maintab.module').then(m => m.MaintabPageModule)
  },
  {
    path: 'statstab',
    loadChildren: () => import('./pages/statstab/statstab.module').then(m => m.StatstabPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
