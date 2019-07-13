import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private eventCollection: AngularFirestoreCollection<any>;
  private events: Observable<any[]>;
  constructor(
    private afs: AngularFirestore) {
    this.eventCollection = this.afs.collection<any>('users/5511957925512/events/');
    this.events = this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addNewEvent(){
    this.eventCollection.add({data: new Date()});
    console.log('add new event');
  }
}
