import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.prepareForm();
  }

  ngOnInit() {
  }

  async prepareForm() {
    this.signUpForm = this.formBuilder.group({
      senha: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      ),
      cel: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(15)
        ])
      ),
      user: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      )
    });
  }

  async signUp() {
    console.log('xablau');
  }

}
