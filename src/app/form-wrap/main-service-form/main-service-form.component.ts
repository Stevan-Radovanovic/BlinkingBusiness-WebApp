import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-service-form',
  templateUrl: './main-service-form.component.html',
  styleUrls: ['./main-service-form.component.css'],
})
export class MainServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  countries: string[];
  serviceConfigForms = [];
  editing = false;
  name = '';
  savedOnce = false;
  @Input() index: number;
  @Output() saved = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<number>();
  prepopulated = false; //for later use

  savedServiceConfigForms = 0;

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

  onDeleteService() {
    this.deleting.emit(this.index);
  }

  deleteServiceConfigForm(id: number) {
    this.serviceConfigForms.splice(id, 1);
    console.log(this.savedServiceConfigForms);
    console.log(this.serviceConfigForms.length);
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

    this.serviceForm.get('serviceName').valueChanges.subscribe((value) => {
      this.name = value;
    });
  }

  updateServiceDetails() {
    if (!this.savedOnce) {
      this.savedOnce = true;
      this.saved.emit(true);
    }
    this.disableEditing();
  }

  onSavedServiceForm(saved: boolean) {
    if (saved) {
      this.savedServiceConfigForms++;
    }
  }
}
