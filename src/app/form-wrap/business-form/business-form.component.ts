import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessObject } from 'src/app/shared/models/business-object.model';
import { CallBrokerService } from 'src/app/shared/services/call-broker.service';
import { FlagsService } from 'src/app/shared/services/flags.service';

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

  prepopulatedFavicon = false;
  prepopulatedLogo = false;
  logoPath = '';
  faviconPath = '';
  editing = false;
  controlNames = ['businessName', 'businessUrl', 'favicon', 'logo', 'color'];

  selectedColor = '';

  constructor(
    private callBroker: CallBrokerService,
    public flags: FlagsService
  ) {}

  ngOnInit(): void {
    this.initBusinessForm();
    this.selectedColor = '';

    if (this.businessForm.get('businessName').value === '') {
      this.enableEditing();
    }

    this.setPrepopulatedImages();

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

  setPrepopulatedImages() {
    if (this.businessObject.businessConfiguration.faviconId) {
      this.faviconPath = this.callBroker.getImageById(
        this.businessObject.businessConfiguration.faviconId
      );
      this.prepopulatedFavicon = true;
    }

    if (this.businessObject.businessConfiguration.logoId) {
      this.logoPath = this.callBroker.getImageById(
        this.businessObject.businessConfiguration.logoId
      );
      this.prepopulatedLogo = true;
    }

    if (this.prepopulatedFavicon) {
      this.businessForm.get('favicon').clearValidators();
    } else {
      this.businessForm.get('favicon').setValidators(Validators.required);
    }

    this.businessForm.get('favicon').updateValueAndValidity();

    if (this.prepopulatedLogo) {
      this.businessForm.get('logo').clearValidators();
    } else {
      this.businessForm.get('logo').setValidators(Validators.required);
    }

    this.businessForm.get('logo').updateValueAndValidity();
  }

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
        { value: this.businessObject?.name, disabled: true },
        [Validators.required]
      ),
      businessUrl: new FormControl(
        { value: this.businessObject?.businessUrl, disabled: true },
        [
          Validators.required,
          Validators.pattern(
            'https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}'
          ),
        ]
      ),
      color: new FormControl(
        {
          value: this.businessObject?.businessConfiguration.primaryColor,
          disabled: true,
        },
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

  restoreInitialValues() {
    this.businessForm.setValue({
      favicon: '',
      logo: '',
      color: this.businessObject?.businessConfiguration.primaryColor,
      businessUrl: this.businessObject?.businessUrl,
      businessName: this.businessObject.name,
    });
  }

  enableEditing() {
    if (this.editing) {
      this.restoreInitialValues();
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

  onSaveBusiness() {
    const newBussines: BusinessObject = {
      name: this.businessForm.get('businessName').value,
      businessUrl: this.businessForm.get('businessUrl').value,
      businessConfiguration: {
        primaryColor: this.businessForm.get('color').value,
        faviconId: 'i3a7b3ad7-0e2b-4ef8-8851-c72858e169d72',
        logoId: 'i3a7b3ad7-0e2b-4ef8-8851-c72858e169d72',
      },
    };
    const test: BusinessObject = {
      name: 'Test',
      businessUrl: 'http://test/api/blinking/user/update',
      businessConfiguration: {
        primaryColor: '#FFFFFF',
        faviconId: 'i3a7b3ad7-0e2b-4ef8-8851-c72858e169d72',
        logoId: 'i3a7b3ad7-0e2b-4ef8-8851-c72858e169d72',
      },
    };

    this.callBroker.addNewBusiness(newBussines).subscribe((result) => {
      this.businessObject = newBussines;
      this.businessObject.id = result.payload.business.id;
    });

    this.disableEditing();
    this.flags.businessConfigCreated = true;
  }
}
