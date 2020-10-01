import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-service-form',
  templateUrl: './main-service-form.component.html',
  styleUrls: ['./main-service-form.component.css'],
})
export class MainServiceFormComponent implements OnInit {
  serviceForm: FormGroup;

  countries: string[];
  serviceConfigForms = ['serviceConfigForm'];
  editing = false;

  constructor() {}

  controlNames = [
    'serviceName',
    'maxNumberOfTries',
    'shouldAskForFaceEnroll',
    'defaultCountry',
    'allowedCountries',
    'sessionValidityDuration',
  ];

  initServiceForm() {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      maxNumberOfTries: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      shouldAskForFaceEnroll: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      defaultCountry: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      allowedCountries: new FormControl({ value: [], disabled: true }, [
        Validators.required,
      ]),
      sessionValidityDuration: new FormControl(
        { value: null, disabled: true },
        [Validators.required]
      ),
    });
  }

  addServiceConfigForm() {
    this.serviceConfigForms.push('serviceConfigForm');
  }

  deleteServiceConfigForm(id: number) {
    this.serviceConfigForms.splice(id, 1);
  }

  enableEditing() {
    if (this.editing) {
      this.disableEditing();
      return;
    }

    this.controlNames.forEach((control) => {
      this.serviceForm.get(control).enable();
    });
    this.editing = true;
  }

  disableEditing() {
    this.controlNames.forEach((control) => {
      this.serviceForm.get(control).disable();
    });
    this.editing = false;
  }

  requiredValidator(controlName: string) {
    return (
      this.serviceForm.get(controlName).hasError('required') &&
      this.serviceForm.get(controlName).touched
    );
  }

  ngOnInit(): void {
    this.countries = ['Serbia', 'Montenegro', 'United States', 'Great Britain'];
    this.initServiceForm();
  }
}
