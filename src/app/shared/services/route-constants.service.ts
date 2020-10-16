import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteConstantsService {
  private onboardingBaseUrl =
    'https://onboarding-api-local-dev.blinking.services';
  public login = this.onboardingBaseUrl + '/login';
  public getAllBusinesses =
    this.onboardingBaseUrl + '/business/getAllBusinesses';
  public getBusinessById = this.onboardingBaseUrl + '/business/getBusinessById';
  public addNewBusiness = this.onboardingBaseUrl + '/business/addNewBusiness';
  public addNewService = this.onboardingBaseUrl + '/business/addNewService';
  public addNewServiceConfig =
    this.onboardingBaseUrl + 'business/addNewServiceConfig';

  private mediaServerBaseUrl = 'https://image-handler-dev.blinking.services';
  public getImageById = this.mediaServerBaseUrl + '/media/public/download/';
}
