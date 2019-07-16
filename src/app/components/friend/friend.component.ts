import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {

  @Input() friend: any;
  @Input() eventId: any;

  private total;
  private eventShoppingCollection: AngularFirestoreCollection<any>;
  private eventShooping: Observable<any[]>;


  constructor(
    private afs: AngularFirestore,

  ) {

  }

  ngOnInit() {
    console.log(this.friend, this.eventId);
    // /events/R8ZOPFj9srvUscDWGOOy/participants/5545988426614/shops
    if (this.eventId) {
      this.eventShoppingCollection = this.afs.collection<any>(`events/${this.eventId}/participants/${this.friend.id}/shops`);
      console.log(this.eventShoppingCollection);
      this.eventShoppingCollection.valueChanges().subscribe(data => {
        this.total = data.reduce((acc, cur) => { return acc + cur.part }, 0);
      });
    }
  }


}
