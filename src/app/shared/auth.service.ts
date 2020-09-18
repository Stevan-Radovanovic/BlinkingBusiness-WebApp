import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loggedIn = false;

  logIn() {
    localStorage.setItem('token', 'randomValue');
    this.loggedIn = true;
    this.router.navigateByUrl('/form');
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
