import { FriendComponent } from './friend.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [FriendComponent],
    declarations: [FriendComponent],
    providers: [],
 })
 
 export class FriendComponentModule {
 }