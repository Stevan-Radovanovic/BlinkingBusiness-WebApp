import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms = [];
  savedServiceForms = 0;

  constructor() {}

  addNewServiceForm() {
    this.serviceForms.push('serviceForm');
  }

  onDeleteService(id: number) {
    //console.log(id);
    //this.serviceForms.splice(id, 1);
  }

  ngOnInit(): void {}

  onSavedServiceForm(saved: boolean) {
    if (saved) {
      this.savedServiceForms++;
    }
  }
}
