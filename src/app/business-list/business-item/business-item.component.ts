import { Component, Input, OnInit } from '@angular/core';
import { BusinessObject } from 'src/app/shared/models/business-object.model';

@Component({
  selector: 'app-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.css'],
})
export class BusinessItemComponent implements OnInit {
  @Input() businessObject: BusinessObject;

  constructor() {}

  ngOnInit(): void {}
}
