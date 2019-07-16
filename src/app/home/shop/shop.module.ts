import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopPage } from './shop.page';
import { FriendComponentModule } from 'src/app/components/friend/friend.component.module';

const routes: Routes = [
  {
    path: '',
    component: ShopPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopPage]
})
export class ShopPageModule {}
