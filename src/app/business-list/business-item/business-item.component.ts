import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessObject } from 'src/app/shared/models/business-object.model';

@Component({
  selector: 'app-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.css'],
})
export class BusinessItemComponent implements OnInit {
  @Input() businessObject: BusinessObject;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.businessObject);
  }

  navigateToForm() {
    this.router.navigateByUrl('form/' + this.businessObject.id);
  }
}
