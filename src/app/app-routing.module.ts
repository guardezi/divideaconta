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
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'cadastro',
    loadChildren: './cadastro/cadastro.module#CadastroPageModule'
  },
  {
    path: 'home/create',
    loadChildren: './home/create/create.module#CreatePageModule'
  },
  {
    path: 'home/event/:id',
    loadChildren: './home/event/event.module#EventPageModule'
  },
  {
    path: 'home/event/:id/shop',
    loadChildren: './home/shop/shop.module#ShopPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
