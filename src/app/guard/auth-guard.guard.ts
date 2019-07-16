import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private events: Events
  ) { }
  doc;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.events.subscribe('userLogout', data => {
        this.router.navigate(['login']);
        this.doc = null;
        return resolve(false);
      });
      this.events.subscribe('userRegister', data => {
        this.router.navigate(['signup']);
        this.doc = null;
        return resolve(false);
      });
      this.user.validateAuth()
        .then(data => {
          if (data) {
            if (data.Id && data.Id !== 0) {
              return resolve(true);
            } else {
              this.router.navigate(['list-business']);
              return resolve(false);
            }
          } else {
            this.router.navigate(['login']);
            return resolve(false);
          }
        })
        .catch(e => {
          this.router.navigate(['login']);
          return resolve(false);
        });
    });
  }
}

