import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guestGuard, loggedInGuard } from "./services/config.service";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule),
    canActivate: [loggedInGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'settings/meters',
    loadChildren: () => import('./settings/meters/list/list.module').then( m => m.ListPageModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'settings/meters/create',
    loadChildren: () => import('./settings/meters/create/create.module').then( m => m.CreatePageModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'settings/meters/view/:id',
    loadChildren: () => import('./settings/meters/view/view.module').then( m => m.ViewPageModule),
    canActivate: [loggedInGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
