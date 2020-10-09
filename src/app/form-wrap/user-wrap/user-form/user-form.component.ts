import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User;

  userForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initUserForm();
  }

  requiredValidator(controlName: string) {
    return (
      this.userForm.get(controlName).hasError('required') &&
      this.userForm.get(controlName).touched
    );
  }

  initUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl(
        { value: this.user.name, disabled: true },
        Validators.required
      ),
      roles: new FormControl(
        { value: this.user.roles, disabled: true },
        Validators.required
      ),
      services: new FormControl(
        { value: this.user.services, disabled: true },
        Validators.required
      ),
      status: new FormControl(
        { value: this.user.status, disabled: true },
        Validators.required
      ),
    });
  }
}
