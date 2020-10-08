import { Component, OnInit } from '@angular/core';
import { BusinessObject } from '../shared/models/business-object.model';
import { CallBrokerService } from '../shared/services/call-broker.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  businessArray: BusinessObject[] = [];

  constructor(public callBroker: CallBrokerService) {}

  ngOnInit(): void {
    this.callBroker.getAllBusinesses().subscribe((response) => {
      if (response.statusCode === 20000) {
        this.businessArray = response.payload;
        console.log(this.businessArray);
      }
    });
  }
}
