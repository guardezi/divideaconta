import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  private eventDocument: AngularFirestoreDocument<any>;
  private eventFriendCollection: AngularFirestoreCollection<any>;
  private eventShoppingCollection: AngularFirestoreCollection<any>;

  private event: Observable<any>;
  private eventFriends: Observable<any[]>;
  private eventShooping: Observable<any[]>;
  private idEvent;
  constructor(
    private activetedRoute: ActivatedRoute,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.activetedRoute.params.subscribe(params => {
      this.idEvent = params['id'];
      this.eventDocument = this.afs.doc<any>(`events/${this.idEvent}`);
      this.eventFriendCollection = this.eventDocument.collection('participants');
      this.eventShoppingCollection = this.eventDocument.collection('shopping');

      this.event = this.eventDocument.valueChanges();
      this.eventFriends = this.eventFriendCollection.valueChanges();
      this.eventShooping = this.eventShoppingCollection.valueChanges();
    });
  }


}
