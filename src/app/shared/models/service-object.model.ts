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
