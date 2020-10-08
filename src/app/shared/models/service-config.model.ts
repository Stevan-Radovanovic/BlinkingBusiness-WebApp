import { AdditionalDoc } from './additional-doc.model';
import { StepType } from './step-type.model';

export interface ServiceConfig {
  id?: number;
  serviceConfigId?: string;
  name?: string;
  baseRedirectUrl: string;
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
}
