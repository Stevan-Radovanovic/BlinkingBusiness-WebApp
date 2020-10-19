import { ServiceClass, ServiceObject } from './service-object.model';
import { User } from './user.model';

export interface BusinessObject {
  id?: number;
  businessId?: string;
  name?: string;
  businessName?: string;
  businessUrl: string;
  userUpdateSchema?: Object;
  requiredSchemaDocuments?: Object;
  businessConfiguration: {
    id?: number;
    businessConfigurationId?: string;
    primaryColor: string;
    faviconId?: string;
    logoId?: string;
  };
  services?: ServiceObject[];
  users?: User[];
}

export class BusinessConfigurationClass {
  constructor(
    public id: number,
    public businessId: string,
    public primaryColor: string,
    public faviconId: string,
    public logoId: string
  ) {}
}

export class BusinessClass {
  constructor(
    public id: number,
    public name: string,
    public businessId: string,
    public businessConfiguration: BusinessConfigurationClass,
    public services: ServiceClass,
    public users: User[] // this is not a class yet
  ) {}
}
