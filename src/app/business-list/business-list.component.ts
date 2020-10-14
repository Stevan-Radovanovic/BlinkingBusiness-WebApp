import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessObject } from '../shared/models/business-object.model';
import { CallBrokerService } from '../shared/services/call-broker.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  businessArray: BusinessObject[] = [];

  constructor(public callBroker: CallBrokerService, private router: Router) {}

  ngOnInit(): void {
    this.callBroker.getAllBusinesses().subscribe((response) => {
      this.businessArray = response;
    });
  }

  addNewBusiness() {
    this.router.navigateByUrl('form/new');
  }
}
