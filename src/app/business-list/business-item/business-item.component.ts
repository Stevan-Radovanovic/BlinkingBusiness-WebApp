import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessObject } from 'src/app/shared/models/business-object.model';
import { CallBrokerService } from 'src/app/shared/services/call-broker.service';

@Component({
  selector: 'app-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.css'],
})
export class BusinessItemComponent implements OnInit {
  @Input() businessObject: BusinessObject;
  logoLink = '';
  faviconLink = '';

  constructor(private router: Router, private callBroker: CallBrokerService) {}

  ngOnInit(): void {
    this.logoLink = this.callBroker.getImageById(
      this.businessObject.businessConfiguration.logoId
    );
    this.faviconLink = this.callBroker.getImageById(
      this.businessObject.businessConfiguration.faviconId
    );
  }

  navigateToForm(): void {
    this.router.navigateByUrl('form/' + this.businessObject.id);
  }
}
