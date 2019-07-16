import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { FriendComponentModule } from 'src/app/component/friend/friend.component.module';
import { ShopComponentModule } from 'src/app/components/shops/shops.component.module';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FriendComponentModule,
    ShopComponentModule
  ],
  declarations: [EventPage]
})
export class EventPageModule {}
