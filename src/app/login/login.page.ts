import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.prepareForm();
  }

  ngOnInit() {
  }

  async prepareForm() {
    this.loginForm = this.formBuilder.group({
      cel: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(15)
      ])),
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  async login() {
    if (this.loginForm.valid) {
      console.log('eureca');
    }
  }

}
