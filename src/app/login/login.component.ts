import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { CallBrokerService } from '../shared/services/call-broker.service';
import { ResponseObject } from '../shared/models/response-object.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    public authService: AuthService,
    public callBroker: CallBrokerService,
    public router: Router
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
    this.callBroker.login(username, password).subscribe(
      (response: ResponseObject) => {
        if (response.statusCode === 20001) {
          localStorage.setItem('token', uuidv4());
          this.authService.loggedIn = true;
          this.authService = response.payload.user;
          this.router.navigate(['/business']);
        }
      },
      () => {
        this.invalidLogIn();
      }
    );
  }

  invalidLogIn() {
    this.authService.validAuth = false;
    setTimeout(() => {
      this.authService.validAuth = true;
    }, 3000);
  }

  requiredValidator(controlName: string) {
    return (
      this.authForm.get(controlName).hasError('required') &&
      this.authForm.get(controlName).touched
    );
  }
}
