import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { FlagsService } from './shared/services/flags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blinking';

  constructor(public authService: AuthService, public flags: FlagsService) {}

  logOut() {
    this.authService.logOut();
  }
}
