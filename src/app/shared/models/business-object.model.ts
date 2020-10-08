import { ServiceObject } from './service-object.model';

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
