import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AuthData } from '../shared/models/auth-data.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(public authService: AuthService) {}

  initForm() {
    this.authForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  logIn() {
    const authData: AuthData = {
      userName: this.authForm.controls.userName.value,
      password: this.authForm.controls.password.value,
    };
    this.authService.logIn(authData);
  }

  requiredValidator(controlName: string) {
    return (
      this.authForm.get(controlName).hasError('required') &&
      this.authForm.get(controlName).touched
    );
  }

  ngOnInit(): void {
    this.initForm();
  }
}
