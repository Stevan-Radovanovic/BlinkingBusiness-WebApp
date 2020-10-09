import { Badge } from './badge.model';
import { Country } from './country.model';
import { ServiceConfig } from './service-config.model';

export interface ServiceObject {
  id?: number;
  name: string;
  serviceConfiguration: {
    allowedSteps?: string[];
    allowedCustomerBadges?: Badge[];
    allowedCountries: Country[];
    shouldAskForFaceEnroll: boolean;
    defaultCountry: Country;
    maxNumberOfTries: number;
    sessionValidity?: number;
  };
  serviceConfigs?: ServiceConfig[];
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
