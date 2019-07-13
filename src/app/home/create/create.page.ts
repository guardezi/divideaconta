import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private eventCollection: AngularFirestoreCollection<any>;

  private userId = '5511957925512';
  private eventForm;
  validationMessages = {
    eventName: [
      { type: 'required', message: 'O nome do evento é obrigatorio!' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private afs: AngularFirestore) {
    this.eventCollection = this.afs.collection<any>('events');
    this.eventForm = this.formBuilder.group({
      eventName: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  addNewEvent() {
    if (this.eventForm.valid) {
      debugger;
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
