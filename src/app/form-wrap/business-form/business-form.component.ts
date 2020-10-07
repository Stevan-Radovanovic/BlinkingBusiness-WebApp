import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessObject } from 'src/app/shared/models/business-object.model';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'],
})
export class BusinessFormComponent implements OnInit {
  businessForm: FormGroup;

  @ViewChild('favicon') favicon: ElementRef<HTMLInputElement>;
  @ViewChild('logo') logo: ElementRef;

  @Input() businessObject: BusinessObject;

  logoPath = '';
  faviconPath = '';
  editing = false;
  controlNames = ['businessName', 'favicon', 'logo', 'color'];

  selectedColor = '';

  constructor() {}

  requiredValidator(controlName: string) {
    return (
      this.businessForm.get(controlName).hasError('required') &&
      this.businessForm.get(controlName).touched
    );
  }

  patternValidator(controlName: string) {
    return (
      this.businessForm.get(controlName).hasError('pattern') &&
      this.businessForm.get(controlName).touched
    );
  }

  fileValidator(controlName: string) {
    return (
      !this.businessForm.get(controlName).hasError('required') &&
      this.businessForm.get(controlName).touched &&
      this.businessForm.get(controlName).invalid
    );
  }

  checkFaviconValidity() {
    if (this.favicon.nativeElement.files.length === 0) return;
    const fileSize = this.favicon.nativeElement.files[0].size / 1024 / 1024;
    const fileType = this.favicon.nativeElement.files[0].type;

    if (
      fileType !== 'image/png' &&
      fileType !== 'image/jpg' &&
      fileType !== 'image/jpeg' &&
      fileType !== 'image/ico'
    ) {
      this.businessForm.get('favicon').setErrors(new Error('custom'));
      return;
    }

    if (fileSize > 3) {
      this.businessForm.get('favicon').setErrors(new Error('custom'));
      return;
    }

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.faviconPath = event.target.result;
    };
    reader.readAsDataURL(this.favicon.nativeElement.files[0]);
  }

  checkLogoValidity() {
    if (this.logo.nativeElement.files.length === 0) return;
    const fileSize = this.logo.nativeElement.files[0].size / 1024 / 1024;
    const fileType = this.logo.nativeElement.files[0].type;

    if (
      fileType !== 'image/png' &&
      fileType !== 'image/jpg' &&
      fileType !== 'image/jpeg' &&
      fileType !== 'image/ico'
    ) {
      this.businessForm.get('logo').setErrors(new Error('custom'));
      return;
    }

    if (fileSize > 3) {
      this.businessForm.get('logo').setErrors(new Error('custom'));
      return;
    }

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.logoPath = event.target.result;
    };
    reader.readAsDataURL(this.logo.nativeElement.files[0]);
  }

  initBusinessForm() {
    this.businessForm = new FormGroup({
      businessName: new FormControl(
        { value: this.businessObject.businessName, disabled: true },
        [Validators.required]
      ),
      color: new FormControl(
        { value: this.businessObject.primaryColor, disabled: true },
        [
          Validators.required,
          Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
        ]
      ),
      favicon: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      logo: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  enableEditing() {
    if (this.editing) {
      this.disableEditing();
      return;
    }

    this.controlNames.forEach((control) => {
      this.businessForm.get(control).enable();
    });
    this.editing = true;
  }

  disableEditing() {
    this.controlNames.forEach((control) => {
      this.businessForm.get(control).disable();
    });
    this.editing = false;
  }

  onUpdateBusiness() {
    this.disableEditing();
  }

  ngOnInit(): void {
    this.initBusinessForm();
    this.selectedColor = '';

    if (this.businessForm.get('businessName').value === '') {
      this.enableEditing();
    }

    this.businessForm.get('color').valueChanges.subscribe((value) => {
      this.selectedColor = value;
      if (!this.businessForm.get('color').valid) {
        this.selectedColor = '';
      }
    });

    this.businessForm.get('favicon').valueChanges.subscribe(() => {
      this.checkFaviconValidity();
    });

    this.businessForm.get('logo').valueChanges.subscribe(() => {
      this.checkLogoValidity();
    });
  }
}
