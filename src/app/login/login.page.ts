import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AngularFireAuth]
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  enviouTelefone = false;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmation: firebase.auth.ConfirmationResult;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {
    this.prepareForm();
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      theme: 'dark',
      badge: 'inline'
    });
  }

  ionViewDidLoad() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-verifier');
  }

  async prepareForm() {
    this.loginForm = this.formBuilder.group({
      cel: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(15)
      ])),
      senha: new FormControl('')
    });
    this.loginForm.controls.cel.valueChanges.subscribe(() => {
      this.enviouTelefone = false;
    })
  }

  async login() {

    const appVerifier = this.recaptchaVerifier;
    const phoneNumber =
    '+55' +  this.loginForm.value.cel.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');


    if (this.loginForm.valid) {
      if (!this.enviouTelefone) {

        this.enviouTelefone = true;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then( confirmationResult => {
          console.log('sms sent', confirmationResult);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          this.confirmation = confirmationResult;
      })
      .catch((error) => {
        console.error('SMS not sent', error);
      });
    } else {
      console.log('enviar codigo firebase', this.loginForm.value.senha);
      this.confirmation.confirm(this.loginForm.value.senha)
      .then(resultado => {
        console.log(resultado.user);
      }).catch(e => {
        console.log('erro:', e);
      });
    }
  }
}

  cadastro() {
    this.router.navigate(['cadastro']);
  }


}
