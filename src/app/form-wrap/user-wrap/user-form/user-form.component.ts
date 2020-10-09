import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/models/role.model';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Input() services: ServiceObject[];

  userForm: FormGroup;
  userIdNumbers: number[] = [];
  roles = Role;

  constructor() {}

  ngOnInit(): void {
    console.log('User', this.user);
    this.userIdNumbers = this.user.services.map((value) => {
      return +value;
    });
    this.initUserForm();
    this.userForm.get('services').valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  requiredValidator(controlName: string) {
    return (
      this.userForm.get(controlName).hasError('required') &&
      this.userForm.get(controlName).touched
    );
  }

  initUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      roles: new FormControl(this.user.roles, Validators.required),
      services: new FormControl(this.userIdNumbers, Validators.required),
      status: new FormControl(this.user.status, Validators.required),
    });
  }
}
