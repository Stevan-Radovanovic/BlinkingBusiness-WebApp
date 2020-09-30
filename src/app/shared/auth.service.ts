import { Injectable, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthData } from './models/auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loggedIn = localStorage.getItem('token') !== null;
  validAuth = true;

  logIn(authData: AuthData) {
    this.validAuth =
      authData.userName === 'admin' && authData.password === 'password';
    if (this.validAuth) {
      localStorage.setItem('token', uuidv4());
      this.loggedIn = true;
      this.router.navigateByUrl('/form');
    }
    this.validAuth = true;
    setTimeout(() => {
      this.validAuth = false;
    }, 600);
  }

  logOut() {
    localStorage.removeItem('token');
    this.validAuth = true;
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
