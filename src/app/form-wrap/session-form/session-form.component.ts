import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css'],
})
export class SessionFormComponent implements OnInit {
  @Input() sessionForm: FormGroup;

  constructor() {}

  getErrorMessage() {
    if (this.sessionForm.controls.blinkingParams.hasError('required')) {
      return 'This field is required';
    }

    if (this.sessionForm.controls.initialSessionConfig.hasError('required')) {
      return 'This field is required';
    }

    if (this.sessionForm.controls.baseRedirectUrl.hasError('required')) {
      return 'This field is required';
    }

    return '';
  }

  getSpecialErrorMessage() {
    return 'Back Side and Front Side should either be selected together, or not selected at all';
  }

  ngOnInit(): void {}
}
