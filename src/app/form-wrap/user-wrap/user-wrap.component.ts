import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { User } from 'src/app/shared/models/user.model';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-wrap',
  templateUrl: './user-wrap.component.html',
  styleUrls: ['./user-wrap.component.css'],
})
export class UserWrapComponent implements OnInit {
  @Input() users: User[];
  @Input() services: ServiceObject[];

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(UserFormComponent,
      {
        data:{user: this.users[0],services: this.services}
      })
  }

  ngOnInit(): void {
    this.openDialog();
  }
}
