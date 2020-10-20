import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessObject } from '../models/business-object.model';
import { ResponseLogInModel } from '../models/response-models/response-log-in.model';
import { GenericResponse } from '../models/response-models/generic-response.model';
import { RouteConstantsService } from './route-constants.service';
import { ResponseAddNewBusinessModel } from '../models/response-models/response-add-new-business.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlagsService } from './flags.service';
import { ServiceObject } from '../models/service-object.model';
import { ServiceConfig } from '../models/service-config.model';

@Injectable({
  providedIn: 'root',
})
export class CallBrokerService {
  constructor(
    private http: HttpClient,
    private routes: RouteConstantsService,
    private router: Router,
    private flags: FlagsService
  ) {}

  login(username: string, password: string): Observable<ResponseLogInModel> {
    const body = {
      username,
      password,
    };
    return this.http.post<ResponseLogInModel>(this.routes.login, body);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.flags.loggedIn = false;
    this.router.navigateByUrl('/login');
  }

  getAllBusinesses(): Observable<BusinessObject[]> {
    return this.http.get<BusinessObject[]>(this.routes.getAllBusinesses);
  }

  getBusinessById(businessId: number): Observable<BusinessObject> {
    const body = {
      businessId,
    };
    return this.http.post<BusinessObject>(this.routes.getBusinessById, body);
  }

  getImageById(imageId: string): string {
    return this.routes.getImageById + imageId;
  }

  addNewBusiness(
    business: BusinessObject
  ): Observable<ResponseAddNewBusinessModel> {
    const body = {
      ...business,
    };

    return this.http.post<ResponseAddNewBusinessModel>(
      this.routes.addNewBusiness,
      body
    );
  }

  addNewService(service: ServiceObject): Observable<{ serviceId: number }> {
    const body = service;

    return this.http.post<{ serviceId: number }>(
      this.routes.addNewService,
      body
    );
  }

  addNewServiceConfig(
    serviceConfig: ServiceConfig
  ): Observable<{ serviceConfigId: number }> {
    const body = { newServiceConfig: serviceConfig };
    console.log(body);
    return this.http.post<any>(this.routes.addNewServiceConfig, body);
  }
}
