import { AdditionalDoc } from './additional-doc.model';

export interface ServiceConfig {
  serviceConfigId?: string;
  serviceConfigName: string;
  baseRedirectUrl: string;
  blinkingParams: string[];
  willEmbedInIframe: boolean;
  skippableSteps?: string[];
  stepsThatRequireProofOfDocuments?: string[];
  initialSessionConfig: string[];
  stepsThatRequireAttention?: string[];
  shouldAskForFaceEnroll: boolean;
  defaultCountry: string;
  additionalDocuments?: AdditionalDoc[];
  maxNumberOfTries: number;
}
