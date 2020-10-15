import { Component } from '@angular/core';
import { CallBrokerService } from './shared/services/call-broker.service';
import { FlagsService } from './shared/services/flags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blinking';

  constructor(
    public callBroker: CallBrokerService,
    public flags: FlagsService
  ) {}

  logOut(): void {
    this.callBroker.logOut();
  }
}
