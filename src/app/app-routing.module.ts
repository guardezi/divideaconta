import { AuthGuard } from './guard/auth-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home/create',
    loadChildren: './home/create/create.module#CreatePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home/event/:id',
    loadChildren: './home/event/event.module#EventPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home/event/:id/shop',
    loadChildren: './home/shop/shop.module#ShopPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
