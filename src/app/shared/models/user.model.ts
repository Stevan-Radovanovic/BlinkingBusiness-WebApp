import { StringifyOptions } from 'querystring';

export interface User {
  name: string;
  roles: string[];
  services: string[];
  status: string;
}
