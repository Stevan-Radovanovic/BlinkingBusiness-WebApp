import { APIKeyType } from './enums/api-key-type.model';

export interface ApiKey {
  apiKeyId?: string;
  type: APIKeyType[];
}
