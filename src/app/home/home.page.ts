import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private userEventCollection: AngularFirestoreCollection<any>;
  private userDoc: AngularFirestoreDocument<any>;
  private events: Observable<any[]>;
  private userEvents: Observable<any[]>;

  private userId;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private alertController: AlertController
  ) {
    this.userId = this.user.loggedUser;
    this.userDoc = this.afs.doc<any>(`users/${this.userId}`);
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

  ngOnInit() {
    this.userDoc.valueChanges().subscribe(u => {
      if (!u) {
        this.presentAlertPrompt();
      } else {
        this.user.userData = u;
      }
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Informe seu nome:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Placeholder 1'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            this.userDoc.set({ phone: this.user.loggedUser, name: data.name });
            this.user.userData = { phone: this.user.loggedUser, name: data.name };
            console.log('Confirm Ok', data);
          }
        }
      ]
    });

    await alert.present();
  }


}
