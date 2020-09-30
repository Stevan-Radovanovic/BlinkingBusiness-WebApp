import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  sessionForms = ['sessionForm'];

  constructor() {}

  addNewSession() {
    console.log('Added new session');
    this.sessionForms.push('sessionForm');
  }

  deleteSession(id: number) {
    console.log('Deleted session');
    this.sessionForms.splice(id, 1);
  }

  ngOnInit(): void {}
}
