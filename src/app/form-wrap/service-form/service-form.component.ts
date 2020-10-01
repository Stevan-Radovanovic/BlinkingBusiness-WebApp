import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormObject } from 'src/app/shared/models/form-object.model';
import { FormSubmitComponent } from '../form-submit/form-submit.component';
import { v4 as uuidv4 } from 'uuid';
import { frontBack } from 'src/app/shared/validators/front-back.validator';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  additional: boolean = false;
  countries: string[];
  serviceForm: FormGroup;
  disableAdditionalDocs = true;

  skippableSteps: string[] = [];
  skippableStepOptions: string[] = [];

  stepsThatRequireProof: string[] = [];
  stepsThatRequireProofOptions: string[] = [];

  stepsThatRequireAttention: string[] = [];
  stepsThatRequireAttentionOptions: string[] = [];

  initServiceForm() {
    this.serviceForm = new FormGroup({
      baseRedirectUrl: new FormControl('', [Validators.required]),
      blinkingParams: new FormControl([], [Validators.required]),
      willEmbedInIframe: new FormControl(null, [Validators.required]),
      skippableSteps: new FormControl([]),
      stepsThatRequireProofOfDocuments: new FormControl([]),
      initialSessionConfig: new FormControl('', [
        Validators.required,
        frontBack,
      ]),
      stepsThatRequireAttention: new FormControl([]),
      maxNumberOfTries: new FormControl(null, [Validators.required]),
      shouldAskForFaceEnroll: new FormControl(null, [Validators.required]),
      defaultCountry: new FormControl('', [Validators.required]),
      additionalDocSubType: new FormControl('', [Validators.required]),
      additionalDocDescription: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const formObject: FormObject = {
      baseRedirectUrl: this.serviceForm.controls.baseRedirectUrl.value,
      blinkingParams: this.serviceForm.controls.blinkingParams.value,
      willEmbedInIframe: this.serviceForm.controls.willEmbedInIframe.value,
      serviceConfiguration: {
        skippableSteps: this.serviceForm.controls.skippableSteps.value,
        stepsThatRequireAttention: this.serviceForm.controls
          .stepsThatRequireAttention.value,
        stepsThatRequireProofOfDocuments: this.serviceForm.controls
          .stepsThatRequireProofOfDocuments.value,
        initialSessionConfig: this.serviceForm.controls.initialSessionConfig
          .value,
      },
    };

    const dialogRef = this.dialog.open(FormSubmitComponent, {
      width: '500px',
      data: { formObject, id: uuidv4() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.serviceForm.reset({
        willEmbedInIframe: false,
        skippableSteps: [],
        stepsThatRequireProofOfDocuments: [],
        stepsThatRequireAttention: [],
      });
    });

    console.log(formObject);
  }

  constructor(public dialog: MatDialog) {}

  requiredValidator(controlName: string) {
    return (
      this.serviceForm.get('additionalDocDescription').value &&
      this.serviceForm.get('additionalDocDescription').value !== '' &&
      this.serviceForm.get('additionalDocSubType').value &&
      this.serviceForm.get('additionalDocSubType').value !== ''
    );
  }

  frontBackValidator() {
    return (
      !this.serviceForm.controls.initialSessionConfig.hasError('required') &&
      this.serviceForm.controls.initialSessionConfig.touched &&
      !this.serviceForm.controls.initialSessionConfig.valid
    );
  }

  documentDisabler(document: string) {
    return (
      this.serviceForm.get('initialSessionConfig').value === null ||
      this.serviceForm.get('initialSessionConfig').value.includes(document)
    );
  }

  ngOnInit(): void {
    this.skippableSteps = ['Account Number', 'Contact Data'];
    this.stepsThatRequireAttention = ['Account Number', 'Address'];
    this.stepsThatRequireProof = ['Account Number', 'Address'];
    this.countries = ['Serbia', 'Montenegro', 'United States', 'Great Britain'];
    this.initServiceForm();

    this.serviceForm
      .get('initialSessionConfig')
      .valueChanges.subscribe((value: string[]) => {
        console.log(value);
        this.skippableStepOptions = [];
        this.stepsThatRequireAttentionOptions = [];
        this.stepsThatRequireProofOptions = [];

        value.forEach((step) => {
          if (this.skippableSteps.includes(step)) {
            this.skippableStepOptions.push(step);
          }
          if (this.stepsThatRequireProof.includes(step)) {
            this.stepsThatRequireProofOptions.push(step);
          }
          if (this.stepsThatRequireAttention.includes(step)) {
            this.stepsThatRequireAttentionOptions.push(step);
          }
        });

        if (value.includes('Additional Documents')) {
          this.additional = true;
        } else {
          this.additional = false;
        }
      });
  }
}
