export interface ServiceFormObject {
  sessionId?: string;
  baseRedirectUrl: string;
  blinkingParams: string[];
  willEmbedInIframe: boolean;
  serviceConfiguration: {
    skippableSteps: string[];
    stepsThatRequireProofOfDocuments: string[];
    initialSessionConfig: string[];
    stepsThatRequireAttention: string[];
  };
}
