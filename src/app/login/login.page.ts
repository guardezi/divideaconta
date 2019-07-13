import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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
      console.log('eureca');
  }

  cadastro() {
    this.router.navigate(['cadastro']);
  }


}
