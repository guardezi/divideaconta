import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';
import { FriendComponentModule } from 'src/app/components/friend/friend.component.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FriendComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatePage]
})
export class CreatePageModule { }
