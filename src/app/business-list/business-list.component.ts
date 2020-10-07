import { Component, OnInit } from '@angular/core';
import { BusinessObject } from '../shared/models/business-object.model';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  businessArray: BusinessObject[] = [];

  constructor() {}

  ngOnInit(): void {}
}
