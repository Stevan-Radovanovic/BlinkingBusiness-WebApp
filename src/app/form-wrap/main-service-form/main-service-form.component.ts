import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-service-form',
  templateUrl: './main-service-form.component.html',
  styleUrls: ['./main-service-form.component.css'],
})
export class MainServiceFormComponent implements OnInit {
  serviceForm: FormGroup;

  constructor() {}

  initServiceForm() {
    this.serviceForm = new FormGroup({
      maxNumberOfTries: new FormControl(null, [Validators.required]),
      shouldAskForFaceEnroll: new FormControl(false, [Validators.required]),
      defaultCountry: new FormControl('', [Validators.required]),
      allowedCountries: new FormControl([], [Validators.required]),
      sessionValidityDuration: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.initServiceForm();
  }
}
