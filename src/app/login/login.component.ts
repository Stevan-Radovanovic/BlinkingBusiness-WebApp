import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AuthData } from '../shared/models/auth-data.model';
import { CallBrokerService } from '../shared/services/call-broker.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    public authService: AuthService,
    public callBroker: CallBrokerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  logIn() {
    const username = this.authForm.get('userName').value;
    const password = this.authForm.get('password').value;
    this.callBroker.login(username, password).subscribe((response) => {
      console.log(response);
    });
  }

  requiredValidator(controlName: string) {
    return (
      this.authForm.get(controlName).hasError('required') &&
      this.authForm.get(controlName).touched
    );
  }
}
