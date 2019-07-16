import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private events: Events,
    private user: UserService
  ) { }
  doc;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
          if (this.user.loggedUser) {
              return resolve(true);
          } else {
              this.router.navigate(['login']);
              return resolve(false);
            }
        });
  }
}

