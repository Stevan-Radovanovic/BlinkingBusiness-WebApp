import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms = [];
  savedServiceForms = 0;
  name = '';

  constructor() {}

  addNewServiceForm() {
    this.serviceForms.push('serviceForm');
  }

  deleteServiceForm(id: number) {
    this.serviceForms.splice(id, 1);
  }

  ngOnInit(): void {}

  onNameChange(name: string) {
    this.name = name;
  }

  onSavedServiceForm(saved: boolean) {
    if (saved) {
      this.savedServiceForms++;
    }
  }
}
