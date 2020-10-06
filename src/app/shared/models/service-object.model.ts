import { ServiceConfig } from './service-config.model';

export interface ServiceObject {
  serviceId?: string;
  serviceName: string;
  shouldAskForFaceEnroll: boolean;
  defaultCountry: string;
  allowedCountries: string[];
  maxNumberOfTries: number;
  sessionValidity: number;
  serviceConfigs?: ServiceConfig[];
}
