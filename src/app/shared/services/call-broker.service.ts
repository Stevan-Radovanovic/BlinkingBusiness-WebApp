import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConstantsService } from './route-constants.service';

@Injectable({
  providedIn: 'root',
})
export class CallBrokerService {
  constructor(
    private http: HttpClient,
    private routes: RouteConstantsService
  ) {}

  login(username: string, password: string) {
    const body = {
      username,
      password,
    };
    return this.http.post(this.routes.login, body);
  }
}
