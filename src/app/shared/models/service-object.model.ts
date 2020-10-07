import { Country } from './country.model';
import { ServiceConfig } from './service-config.model';

export interface ServiceObject {
  serviceId?: string;
  serviceName: string;
  shouldAskForFaceEnroll: boolean;
  defaultCountry: Country;
  allowedCountries: Country[];
  maxNumberOfTries: number;
  sessionValidity: number;
  serviceConfigs?: ServiceConfig[];
}
