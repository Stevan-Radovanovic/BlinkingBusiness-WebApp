import { Component, Input, OnInit } from '@angular/core';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-wrap',
  templateUrl: './user-wrap.component.html',
  styleUrls: ['./user-wrap.component.css'],
})
export class UserWrapComponent implements OnInit {
  @Input() users: User[];
  @Input() services: ServiceObject[];

  constructor() {}

  ngOnInit(): void {}
}
