import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms = ['serviceForm'];

  constructor() {}

  addNewServiceForm() {
    this.serviceForms.push('serviceForm');
  }

  deleteServiceForm(id: number) {
    this.serviceForms.splice(id, 1);
  }

  ngOnInit(): void {}
}
