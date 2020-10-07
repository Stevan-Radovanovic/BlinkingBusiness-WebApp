import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteConstantsService {
  public login = '/login';
  public getAllBusinesses = '/business/getAllBusinesses';
}
