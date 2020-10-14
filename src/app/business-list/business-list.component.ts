import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessObject } from '../shared/models/business-object.model';
import { CallBrokerService } from '../shared/services/call-broker.service';
import { FlagsService } from '../shared/services/flags.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  businessArray: BusinessObject[] = [];

  constructor(
    public callBroker: CallBrokerService,
    private router: Router,
    public flags: FlagsService
  ) {}

  ngOnInit(): void {
    this.callBroker.getAllBusinesses().subscribe((response) => {
      this.businessArray = response;
      this.flags.loading = false;
    });
  }

  addNewBusiness() {
    this.router.navigateByUrl('form/new');
  }
}
