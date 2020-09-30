import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms = ['sessionForm'];

  constructor() {}

  addNewSession() {
    console.log('Added new session');
    this.serviceForms.push('sessionForm');
  }

  deleteSession(id: number) {
    console.log('Deleted session');
    this.serviceForms.splice(id, 1);
  }

  ngOnInit(): void {}
}
