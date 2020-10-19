import { AdditionalDoc } from './additional-doc.model';
import { ConfigType } from './enums/config-type.model';
import { StepType } from './enums/step-type.model';

export interface ServiceConfig {
  serviceId?: string;
  configId?: string;
  serviceConfigId?: string;
  name?: string;
  baseRedirectUrl?: string;
  blinkingParams?: string[];
  willEmbedInIframe?: boolean;
  skippableSteps?: string[];
  stepsThatRequireProofOfDocuments?: string[];
  initialSessionConfig: StepType[];
  stepsThatRequireAttention?: string[];
  shouldAskForFaceEnroll: boolean;
  defaultCountry: string;
  additionalDocuments?: AdditionalDoc[];
  maxNumberOfTries: number;
  configType?: ConfigType[];
  sessionTimeValid?: number;
  initialBlinkingProcess?: StepType;
}

export class ServiceConfigClass {
  constructor(
    public id: number,
    public serviceConfigId: string,
    public name: string,
    public baseRedirectUrl: string,
    public blinkingParams: string[],
    public willEmbedInIframe: boolean,
    public skippableSteps: string[],
    public stepsThatRequireProofOfDocuments: string[],
    public initialSessionConfig: StepType[],
    public stepsThatRequireAttention: string[],
    public shouldAskForFaceEnroll: boolean,
    public defaultCountry: string,
    public additionalDocuments: AdditionalDoc[],
    public maxNumberOfTries: number
  ) {}
}
