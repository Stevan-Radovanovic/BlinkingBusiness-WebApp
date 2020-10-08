import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteConstantsService {
  public baseUrl = 'https://onboarding-api-local-dev.blinking.services';
  public login = this.baseUrl + '/login';
  public getAllBusinesses = this.baseUrl + '/business/getAllBusinesses';
  public getBusinessById = this.baseUrl + '/business/getBusinessById';
}
