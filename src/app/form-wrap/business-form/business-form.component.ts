import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'],
})
export class BusinessFormComponent implements OnInit {
  @Input() businessForm: FormGroup;

  selectedColor = '';

  constructor() {}

  ngOnInit(): void {
    this.selectedColor = '';
    this.businessForm.get('color').valueChanges.subscribe((value) => {
      this.selectedColor = value;
      if (!this.businessForm.get('color').valid) {
        this.selectedColor = '';
      }
    });
  }
}
