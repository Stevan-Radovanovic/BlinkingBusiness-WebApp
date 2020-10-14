import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor() {}

  public newBusiness = false;
  public businessConfigCreated = false;
  public newUser = false;
  public loading = false;
}
