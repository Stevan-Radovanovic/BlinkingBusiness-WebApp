import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessObject } from '../models/business-object.model';
import { ResponseLogInModel } from '../models/response-models/response-log-in.model';
import { GenericResponse } from '../models/response-models/generic-response.model';
import { RouteConstantsService } from './route-constants.service';
import { ResponseAddNewBusinessModel } from '../models/response-models/response-add-new-business.model';

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
    return this.http.post<ResponseLogInModel>(this.routes.login, body);
  }

  getAllBusinesses() {
    return this.http.get<BusinessObject[]>(this.routes.getAllBusinesses);
  }

  getBusinessById(businessId: number) {
    const body = {
      businessId,
    };
    return this.http.post<BusinessObject>(this.routes.getBusinessById, body);
  }

  getImageById(imageId: string) {
    return this.routes.getImageById + imageId;
  }

  addNewBusiness(business: BusinessObject) {
    const body = {
      ...business,
    };

    return this.http.post<ResponseAddNewBusinessModel>(
      this.routes.addNewBusiness,
      body
    );
  }
}
