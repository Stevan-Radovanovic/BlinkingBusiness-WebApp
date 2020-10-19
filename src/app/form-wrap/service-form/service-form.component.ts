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
import { MatDialog } from '@angular/material/dialog';
import { frontBack } from 'src/app/shared/validators/front-back.validator';
import { AdditionalDoc } from 'src/app/shared/models/additional-doc.model';
import { SubType } from 'src/app/shared/models/enums/sub-type.model';
import { StepType } from 'src/app/shared/models/enums/step-type.model';
import { ServiceConfig } from 'src/app/shared/models/service-config.model';
import { Country } from 'src/app/shared/models/country.model';
import { v4 as uuidv4 } from 'uuid';
import { ConfigType } from 'src/app/shared/models/enums/config-type.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  @Input() allowedCountries: string[] = [];
  @Output() saved = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<string>();
  @Input() configObject: ServiceConfig;
  @Input() allowedSteps: string[];
  @Input() expand: boolean;
  @ViewChild('docDesc') additionalDocDesc: ElementRef<HTMLInputElement>;

  newServiceConfig = false;
  editing = false;
  savedOnce = false;
  subtype = SubType;
  steptype = StepType;
  additionalDocArray: AdditionalDoc[] = [];
  additional = false;
  serviceForm: FormGroup;
  disableAdditionalDocs = true;
  showError = false;
  name = '';
  country = Country;

  skippableSteps: string[] = [];
  skippableStepOptions: string[] = [];

  stepsThatRequireProof: string[] = [];
  stepsThatRequireProofOptions: string[] = [];

  stepsThatRequireAttention: string[] = [];
  stepsThatRequireAttentionOptions: string[] = [];

  controlNames = [
    'serviceConfigName',
    'baseRedirectUrl',
    'blinkingParams',
    'willEmbedInIframe',
    'skippableSteps',
    'stepsThatRequireProofOfDocuments',
    'maxNumberOfTries',
    'stepsThatRequireAttention',
    'shouldAskForFaceEnroll',
    'defaultCountry',
    'additionalDocSubType',
    'additionalDocDescription',
    'initialSessionConfig',
  ];

  ngOnInit(): void {
    this.name = this.configObject.name;
    this.skippableSteps = ['Account number', 'Contact data'];
    this.stepsThatRequireAttention = ['Account number', 'Address'];
    this.stepsThatRequireProof = ['Account number', 'Address'];

    this.initServiceForm();
    this.changeStepOptions(this.configObject.initialSessionConfig);

    if (
      this.configObject.additionalDocuments &&
      this.configObject.additionalDocuments.length > 0
    ) {
      this.additionalDocArray = this.configObject.additionalDocuments;
      this.disableAdditionalDocs = false;
    }

    if (this.serviceForm.get('serviceConfigName').value === '') {
      this.enableEditing();
      this.newServiceConfig = true;
    }

    this.serviceForm
      .get('serviceConfigName')
      .valueChanges.subscribe((value) => {
        this.name = value;
      });

    this.serviceForm
      .get('initialSessionConfig')
      .valueChanges.subscribe((value: string[]) => {
        this.changeStepOptions(value);

        if (value.includes('Additional document')) {
          this.additional = true;
        } else {
          this.additional = false;
          this.checkValidityProofOfDocs();
          this.additionalDocArray = [];
        }

        if (
          !value.includes('Document type') &&
          !value.includes('Document type with country') &&
          (value.includes('Front side') || value.includes('Back side'))
        ) {
          const index1 = value.indexOf('Front side');
          if (index1 !== -1) {
            value.splice(index1, 1);
          }

          const index2 = value.indexOf('Back side');
          if (index2 !== -1) {
            value.splice(index2, 1);
          }

          this.serviceForm.patchValue({
            initialSessionConfig: value,
          });
        }
      });

    this.serviceForm
      .get('additionalDocSubType')
      .valueChanges.subscribe((value: string) => {
        switch (value) {
          case this.subtype.DOCUMENT_COPY: {
            this.serviceForm.patchValue({
              additionalDocDescription: this.subtype.DOCUMENT_COPY,
            });
            this.additionalDocDesc.nativeElement.disabled = true;
            break;
          }
          case this.subtype.PROOF_OF_ADDRESS: {
            this.serviceForm.patchValue({
              additionalDocDescription: this.subtype.PROOF_OF_ADDRESS,
            });
            this.additionalDocDesc.nativeElement.disabled = true;
            break;
          }
          case this.subtype.PROOF_OF_INCOME: {
            this.serviceForm.patchValue({
              additionalDocDescription: this.subtype.PROOF_OF_INCOME,
            });
            this.additionalDocDesc.nativeElement.disabled = true;
            break;
          }
          case this.subtype.OTHER: {
            this.serviceForm.patchValue({
              additionalDocDescription: '',
            });
            this.additionalDocDesc.nativeElement.disabled = false;
            break;
          }
        }
      });
  }

  onDeleteService(): void {
    this.deleting.emit(this.configObject.serviceConfigId);
  }

  initServiceForm(): void {
    this.serviceForm = new FormGroup({
      serviceConfigName: new FormControl(
        { value: this.configObject.name, disabled: true },
        Validators.required
      ),
      baseRedirectUrl: new FormControl(
        { value: this.configObject.baseRedirectUrl, disabled: true },
        [
          Validators.required,
          Validators.pattern(
            'https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}'
          ),
        ]
      ),
      blinkingParams: new FormControl(
        { value: this.configObject.blinkingParams, disabled: true },
        [Validators.required]
      ),
      willEmbedInIframe: new FormControl(
        { value: this.configObject.willEmbedInIframe, disabled: true },
        [Validators.required]
      ),
      skippableSteps: new FormControl({
        value: this.configObject.skippableSteps,
        disabled: true,
      }),
      stepsThatRequireProofOfDocuments: new FormControl({
        value: this.configObject.stepsThatRequireProofOfDocuments,
        disabled: true,
      }),
      initialSessionConfig: new FormControl(
        { value: this.configObject.initialSessionConfig, disabled: true },
        [Validators.required, frontBack]
      ),
      stepsThatRequireAttention: new FormControl({
        value: this.configObject.stepsThatRequireAttention,
        disabled: true,
      }),
      maxNumberOfTries: new FormControl(
        { value: this.configObject.maxNumberOfTries, disabled: true },
        [Validators.required]
      ),
      shouldAskForFaceEnroll: new FormControl(
        { value: this.configObject.shouldAskForFaceEnroll, disabled: true },
        [Validators.required]
      ),
      defaultCountry: new FormControl(
        { value: this.configObject.defaultCountry, disabled: true },
        [Validators.required]
      ),
      additionalDocSubType: new FormControl({ value: '', disabled: true }),
      additionalDocDescription: new FormControl({ value: '', disabled: true }),
    });
  }

  constructor(public dialog: MatDialog) {}

  restoreInitialValues(): void {
    this.serviceForm.setValue({
      serviceConfigName: '', // not in payload?
      baseRedirectUrl: '', // not in payload?
      blinkingParams: [], // not in payload?
      willEmbedInIframe: false, // not in payload?
      skippableSteps: this.configObject.skippableSteps,
      stepsThatRequireProofOfDocuments: this.configObject
        .stepsThatRequireProofOfDocuments,
      initialSessionConfig: this.configObject.initialSessionConfig,
      stepsThatRequireAttention: this.configObject.stepsThatRequireAttention,
      maxNumberOfTries: this.configObject.maxNumberOfTries,
      shouldAskForFaceEnroll: this.configObject.shouldAskForFaceEnroll,
      defaultCountry: this.configObject.defaultCountry,
      additionalDocDescription: '',
      additionalDocSubType: '',
    });
  }

  enableEditing(): void {
    if (this.editing) {
      this.restoreInitialValues();
      this.disableEditing();
      return;
    }
    this.controlNames.forEach((control) => {
      this.serviceForm.get(control).enable();
    });
    this.editing = true;
  }

  disableEditing(): void {
    this.controlNames.forEach((control) => {
      this.serviceForm.get(control).disable();
    });
    this.editing = false;
  }

  requiredValidator(controlName: string): boolean {
    return (
      this.serviceForm.get(controlName).hasError('required') &&
      this.serviceForm.get(controlName).touched
    );
  }

  frontBackValidator(): boolean {
    return (
      !this.serviceForm.controls.initialSessionConfig.hasError('required') &&
      this.serviceForm.controls.initialSessionConfig.touched &&
      !this.serviceForm.controls.initialSessionConfig.valid
    );
  }

  checkValidityProofOfDocs(): void {
    if (this.additional) {
      this.serviceForm
        .get('stepsThatRequireProofOfDocuments')
        .setValidators(Validators.required);
      this.serviceForm
        .get('stepsThatRequireProofOfDocuments')
        .updateValueAndValidity();
      this.showError = true;
      this.serviceForm.get('stepsThatRequireProofOfDocuments').markAsTouched();
    } else {
      this.serviceForm
        .get('stepsThatRequireProofOfDocuments')
        .clearValidators();
      this.serviceForm
        .get('stepsThatRequireProofOfDocuments')
        .updateValueAndValidity();
      this.showError = false;
    }
  }

  documentDisabler(document: string): boolean {
    return (
      this.serviceForm.get('initialSessionConfig').value === null ||
      this.serviceForm.get('initialSessionConfig').value.includes(document)
    );
  }

  addNewAditionalDocument(): void {
    const addDoc: AdditionalDoc = {
      id: uuidv4(),
      subType: this.serviceForm.get('additionalDocSubType').value,
      description: this.serviceForm.get('additionalDocDescription').value,
    };
    this.additionalDocArray.push(addDoc);
    this.checkValidityProofOfDocs();
    this.serviceForm.patchValue({
      additionalDocSubType: '',
      additionalDocDescription: '',
    });
  }

  patternValidator(controlName: string): boolean {
    return (
      this.serviceForm.get(controlName).hasError('pattern') &&
      this.serviceForm.get(controlName).touched
    );
  }

  saveServiceConfig(): void {
    this.newServiceConfig = false;
    const newServiceConfig: ServiceConfig = {
      serviceId: 'string' /*this.configObject.serviceId*/,
      defaultCountry: this.serviceForm.get('defaultCountry').value,
      maxNumberOfTries: this.serviceForm.get('maxNumberOfTries').value,
      initialSessionConfig: this.serviceForm.get('initialSessionConfig').value,
      shouldAskForFaceEnroll: this.serviceForm.get('shouldAskForFaceEnroll')
        .value,
      skippableSteps: this.serviceForm.get('skippableSteps').value,
      stepsThatRequireAttention: this.serviceForm.get(
        'stepsThatRequireAttention'
      ).value,
      stepsThatRequireProofOfDocuments: this.serviceForm.get(
        'stepsThatRequireProofOfDocuments'
      ).value,
      configType: [ConfigType.ACCOUNT],
      sessionTimeValid: 10, // hard-code
    };
    console.log(newServiceConfig);
    this.disableEditing();
  }

  updateServiceConfig(): void {}

  changeStepOptions(value: string[]): void {
    this.skippableStepOptions = [];
    this.stepsThatRequireAttentionOptions = [];
    this.stepsThatRequireProofOptions = [];

    if (!value) {
      return;
    }

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

    if (value.includes('Additional document')) {
      this.additional = true;
    } else {
      this.additional = false;
      this.checkValidityProofOfDocs();
      this.additionalDocArray = [];
    }
  }
}
