import { ServiceClass, ServiceObject } from './service-object.model';
import { User } from './user.model';

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
  users?: User[];
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
    public services: ServiceClass,
    public users: User[] //this is not yet a class
  ) {}
}
