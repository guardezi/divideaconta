import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  private eventDocument: AngularFirestoreDocument<any>;
  private eventFriendCollection: AngularFirestoreCollection<any>;
  private eventShoppingCollection: AngularFirestoreCollection<any>;
  private idEvent;

  private eventFriends: Observable<any[]>;
  private shopForm;
  private selectedFriends: any[] = [];

  validationMessages = {
    itemName: [
      { type: 'required', message: 'O nome do item é obrigatorio!' },
    ],
    itemPrice: [
      { type: 'required', message: 'O preço do item é obrigatorio!' },
    ]
  };

  constructor(
    private activetedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {
    this.shopForm = this.formBuilder.group({
      itemName: new FormControl('', Validators.required),
      itemPrice: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    this.activetedRoute.params.subscribe(params => {
      this.idEvent = params['id'];
      this.eventDocument = this.afs.doc<any>(`events/${this.idEvent}`);
      this.eventFriendCollection = this.eventDocument.collection('participants');
      this.eventShoppingCollection = this.eventDocument.collection('shopping');

      this.eventFriends = this.eventFriendCollection.valueChanges();

    });
  }
  async registerShop() {
    if (this.shopForm.valid && this.selectedFriends.length) {
      const pricePerFriend = 1 / this.selectedFriends.length;
      const item = this.shopForm.value;
      const shoppRef = await this.eventShoppingCollection.add(item);
      console.log(shoppRef.path);
      await this.selectedFriends.map(async (f) => {
        await this.afs.doc(`${shoppRef.path}/split/${f.id}`).set({
          fare: pricePerFriend,
          part: item.itemPrice * pricePerFriend,
          ...f
        });
        await this.afs.doc(`events/${this.idEvent}/participants/${f.id}/shops/${shoppRef.id}`).set({
          fare: pricePerFriend,
          part: item.itemPrice * pricePerFriend,
          ...f
        });
      });
      this.goBack();


    }

  }


  addFriendShop(friend) {
    if (this.selectedFriends.indexOf(friend) < 0) {
      this.selectedFriends.push(friend);
    }
  }

  goBack() {
    this.router.navigateByUrl('/home/event/' + this.idEvent);
  }
}
