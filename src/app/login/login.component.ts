import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(private authService: AuthService) {}

  initForm() {
    this.authForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  logIn() {
    this.authService.logIn();
  }

  getErrorMessage() {
    if (this.authForm.controls.userName.hasError('required')) {
      return 'This field is required';
    }

    if (this.authForm.controls.password.hasError('required')) {
      return 'This field is required';
    }

    return '';
  }

  ngOnInit(): void {
    this.initForm();
  }
}
