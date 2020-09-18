import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'],
})
export class BusinessFormComponent implements OnInit {
  @Input() businessForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
