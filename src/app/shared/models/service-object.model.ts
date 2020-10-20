import { ApiKey } from './api-key.model';
import { Badge } from './badge.model';
import { Country } from './enums/country.model';
import { ServiceConfig } from './service-config.model';

export interface ServiceObject {
  businessId?: number;
  serviceId?: number;
  password?: string;
  serviceSecret?: string;
  id?: number;
  name?: string;
  serviceName?: string;
  serviceConfiguration: {
    allowedSteps?: string[];
    allowedCustomerBadges?: Badge[];
    allowedCountries: Country[];
    shouldAskForFaceEnroll: boolean;
    defaultCountry: Country;
    maxNumberOfTries: number;
    sessionTimeValid?: number;
    serviceType?: string[];
  };
  serviceConfigs?: ServiceConfig[];
  apiKey?: ApiKey;
}

export class ServiceConfigurationClass {
  constructor(
    public allowedSteps: string[],
    public allowedCustomerBadges: Badge[],
    public allowedCountries: Country[],
    public shouldAskForFaceEnroll: boolean,
    public defaultCountry: Country,
    public maxNumberOfTries: number,
    public sessionValidity: number
  ) {}
}

export class ServiceClass {
  constructor(
    public id: number,
    public name: string,
    public serviceConfiguration: ServiceConfigurationClass,
    public serviceConfigs: ServiceConfig[]
  ) {}
}
