import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { User } from 'src/app/shared/models/user.model';
import { FlagsService } from 'src/app/shared/services/flags.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-wrap',
  templateUrl: './user-wrap.component.html',
  styleUrls: ['./user-wrap.component.css'],
})
export class UserWrapComponent implements OnInit {
  @Input() users: User[];
  @Input() services: ServiceObject[];

  constructor(public dialog: MatDialog, public flags: FlagsService) {}

  deleteUser(id: number) {
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { user, services: this.services },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        const index = this.users.findIndex((user) => {
          return user.id === result.id;
        });
        this.users[index] = result;
      }
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { services: this.services },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.users.push(result);
      }
    });
  }

  ngOnInit(): void {}
}
