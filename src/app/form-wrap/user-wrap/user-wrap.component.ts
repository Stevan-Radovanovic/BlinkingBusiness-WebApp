import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-wrap',
  templateUrl: './user-wrap.component.html',
  styleUrls: ['./user-wrap.component.css'],
})
export class UserWrapComponent implements OnInit {
  @Input() users: User[];

  constructor() {}

  ngOnInit(): void {}
}
