import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/shared/models/role.model';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  //@Input() user: User;
  //@Input() services: ServiceObject[];

  userForm: FormGroup;
  userIdNumbers: number[] = [];
  roles = Role;
  addingNew = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; services: ServiceObject[] },
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.user) {
      this.addingNew = false;
      this.userIdNumbers = this.data.user.services.map((value) => {
        return +value;
      });
    }

    this.initUserForm();
  }

  requiredValidator(controlName: string) {
    return (
      this.userForm.get(controlName).hasError('required') &&
      this.userForm.get(controlName).touched
    );
  }

  updateUser() {
    const user: User = {
      id: this.data.user.id,
      name: this.userForm.get('name').value,
      roles: this.userForm.get('roles').value,
      services: this.userForm.get('services').value,
      status: this.userForm.get('status').value,
    };

    this.dialogRef.close(user);
  }

  createUser() {
    const user: User = {
      name: this.userForm.get('name').value,
      roles: this.userForm.get('roles').value,
      services: this.userForm.get('services').value,
      status: this.userForm.get('status').value,
    };

    this.dialogRef.close(user);
  }

  initUserForm() {
    if (this.addingNew) {
      this.userForm = new FormGroup({
        name: new FormControl('', Validators.required),
        roles: new FormControl([], Validators.required),
        services: new FormControl([], Validators.required),
        status: new FormControl('', Validators.required),
      });
    } else {
      this.userForm = new FormGroup({
        name: new FormControl(this.data.user.name, Validators.required),
        roles: new FormControl(this.data.user.roles, Validators.required),
        services: new FormControl(this.userIdNumbers, Validators.required),
        status: new FormControl(this.data.user.status, Validators.required),
      });
    }
  }
}
