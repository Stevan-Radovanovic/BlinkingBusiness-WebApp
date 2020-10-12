import { StringifyOptions } from 'querystring';

export interface User {
  id?: number;
  name: string;
  roles: string[];
  services: string[];
  status: string;
}
