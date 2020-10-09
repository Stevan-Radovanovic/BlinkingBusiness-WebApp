import { ServiceClass, ServiceObject } from './service-object.model';

export interface BusinessObject {
  id?: number;
  name: string;
  businessUrl: string;
  businessConfiguration: {
    primaryColor: string;
    faviconId?: string;
    logoId?: string;
  };
  services?: ServiceObject[];
}

export class BusinessConfigurationClass {
  constructor(
    public primaryColor: string,
    public faviconId: string,
    public logoId: string
  ) {}
}

export class BusinessClass {
  constructor(
    public id: number,
    public name: string,
    public businessConfiguration: BusinessConfigurationClass,
    public services: ServiceClass
  ) {}
}
