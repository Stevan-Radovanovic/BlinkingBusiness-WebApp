import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loggedIn = false;

  logIn() {
    localStorage.setItem('token', uuidv4());
    this.loggedIn = true;
    this.router.navigateByUrl('/form');
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
