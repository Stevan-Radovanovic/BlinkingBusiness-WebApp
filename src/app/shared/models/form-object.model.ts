export interface FormObject {
  baseRedirectUrl: string;
  blinkingParams: string[];
  serviceConfiguration: {
    skippableSteps: string[];
    stepsThatRequireProofOfDocuments: string[];
    initialSessionConfig: string[];
    stepsThatRequireAttention: string[];
  };
}
