import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private eventCollection: AngularFirestoreCollection<any>;
  private userCollection: AngularFirestoreCollection<any>;
  private userList: Observable<any[]>;

  private selectedFriends: any[] = [];

  private userId;
  private eventForm;
  validationMessages = {
    eventName: [
      { type: 'required', message: 'O nome do evento é obrigatorio!' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private user: UserService) {
    this.userId = this.user.loggedUser;
    this.eventCollection = this.afs.collection<any>('events');

    this.userCollection = this.afs.collection<any>('users');
    this.userList = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.eventForm = this.formBuilder.group({
      eventName: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }

  removeFriendEvent(friend) {
    this.selectedFriends = this.selectedFriends.filter((f) => {
      return f !== friend;
    });
  }

  addFriendEvent(friend: any) {
    if (this.selectedFriends.indexOf(friend) < 0) {
      this.selectedFriends.push(friend);
    }
  }

  addNewEvent() {
    if (this.eventForm.valid) {
      const data = this.eventForm.value;
      const evn = { open: true, data: new Date(), ...data };
      this.eventCollection.add(evn)
        .then(ev => {
          const evnDoc = this.afs.doc(`users/${this.userId}/events/${ev.id}`);
          evnDoc.set(evn)
            .then(() => {
              this.goBack();
            });
        });
    }
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

}
