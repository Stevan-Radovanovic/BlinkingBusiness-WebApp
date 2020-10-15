import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { CallBrokerService } from '../shared/services/call-broker.service';
import { FlagsService } from '../shared/services/flags.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    public callBroker: CallBrokerService,
    public router: Router,
    public flags: FlagsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.authForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  logIn(): void {
    const username = this.authForm.get('userName').value;
    const password = this.authForm.get('password').value;
    this.callBroker.login(username, password).subscribe((response) => {
      localStorage.setItem('token', uuidv4());
      this.flags.loggedIn = true;
      console.log(response.user); // for now
      this.router.navigate(['/business']);
      this.flags.loading = false;
    });
  }

  requiredValidator(controlName: string): boolean {
    return (
      this.authForm.get(controlName).hasError('required') &&
      this.authForm.get(controlName).touched
    );
  }
}
