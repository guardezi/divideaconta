import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private userEventCollection: AngularFirestoreCollection<any>;
  private events: Observable<any[]>;
  private userEvents: Observable<any[]>;

  private userId;

  constructor(
    private afs: AngularFirestore,
    private user: UserService
  ) {
    this.userId = this.user.loggedUser;
    this.userEventCollection = this.afs.collection<any>(`users/${this.userId}/events/`);
    this.userEvents = this.userEventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


}
