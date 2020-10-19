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
import { Country } from 'src/app/shared/models/enums/country.model';
import { ServiceConfig } from 'src/app/shared/models/service-config.model';
import { ServiceObject } from 'src/app/shared/models/service-object.model';
import { StepType } from 'src/app/shared/models/enums/step-type.model';
import { FlagsService } from 'src/app/shared/services/flags.service';
import { v4 as uuidv4 } from 'uuid';
import { APIKeyType } from 'src/app/shared/models/enums/api-key-type.model';
import { ServiceType } from 'src/app/shared/models/enums/service-type.model';
import { CallBrokerService } from 'src/app/shared/services/call-broker.service';

@Component({
  selector: 'app-service-configuration-form',
  templateUrl: './service-configuration-form.component.html',
  styleUrls: ['./service-configuration-form.component.css'],
})
export class ServiceConfigurationFormComponent implements OnInit {
  serviceForm: FormGroup;
  countries: string[];
  country = Country;
  serviceConfigForms: ServiceConfig[] = [];
  newService = false;
  editing = false;
  steptype = StepType;
  name = '';
  serviceSaved = false;
  expandConfigPanels: boolean[] = [];
  allowedDefault = [
    'Document type with country',
    'Document type',
    'Front side',
    'Back side',
    'Adress',
    'Account number',
    'Face',
    'Contact data',
    'Video session',
    'Additional document',
  ];
  controlNames = [
    'serviceName',
    'maxNumberOfTries',
    'shouldAskForFaceEnroll',
    'defaultCountry',
    'allowedCountries',
    'sessionValidityDuration',
  ];

  @Input() expand: boolean;
  @Input() serviceObject: ServiceObject;
  @Output() saved = new EventEmitter<boolean>();
  @Output() deleting = new EventEmitter<number>();

  savedServiceConfigForms = 0;

  constructor(
    public flags: FlagsService,
    public callBroker: CallBrokerService
  ) {}

  ngOnInit(): void {
    console.log(this.serviceObject);
    if (this.serviceObject.serviceConfigs) {
      this.serviceConfigForms = this.serviceObject.serviceConfigs;
      this.serviceConfigForms.forEach((form) => {
        this.expandConfigPanels.push(false);
      });
    } else {
      this.serviceConfigForms = [];
    }

    console.log(this.serviceObject);
    this.name = this.serviceObject.name;
    this.countries = ['Serbia', 'Montenegro', 'United States', 'Great Britain'];
    this.initServiceForm();

    if (this.serviceForm.get('serviceName').value === '') {
      this.enableEditing();
      console.log('1');
      this.newService = true;
    }

    this.serviceForm.get('serviceName').valueChanges.subscribe((value) => {
      this.name = value;
    });
  }

  initServiceForm(): void {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl(
        { value: this.serviceObject.name, disabled: true },
        [Validators.required]
      ),
      maxNumberOfTries: new FormControl(
        {
          value: this.serviceObject.serviceConfiguration.maxNumberOfTries,
          disabled: true,
        },
        [Validators.required]
      ),
      shouldAskForFaceEnroll: new FormControl(
        {
          value: this.serviceObject.serviceConfiguration.shouldAskForFaceEnroll,
          disabled: true,
        },
        [Validators.required]
      ),
      defaultCountry: new FormControl(
        {
          value: this.serviceObject.serviceConfiguration.defaultCountry,
          disabled: true,
        },
        [Validators.required]
      ),
      allowedCountries: new FormControl(
        {
          value: this.serviceObject.serviceConfiguration.allowedCountries,
          disabled: true,
        },
        [Validators.required]
      ),
      sessionValidityDuration: new FormControl(
        {
          value: this.serviceObject.serviceConfiguration.sessionTimeValid,
          disabled: true,
        },
        [Validators.required]
      ),
    });
  }

  addServiceConfigForm(): void {
    console.log('wtf');
    const newConfig: ServiceConfig = {
      serviceConfigId: uuidv4(),
      baseRedirectUrl: '',
      defaultCountry: null,
      blinkingParams: [],
      maxNumberOfTries: null,
      shouldAskForFaceEnroll: true,
      initialSessionConfig: [],
      name: '',
      willEmbedInIframe: true,
      skippableSteps: [],
      stepsThatRequireAttention: [],
      stepsThatRequireProofOfDocuments: [],
    };
    this.expandConfigPanels.push(true);
    this.serviceConfigForms.push(newConfig);
  }

  onDeleteService(): void {
    this.deleting.emit(this.serviceObject.id);
  }

  deleteServiceConfigForm(id: string): void {
    this.serviceConfigForms = this.serviceConfigForms.filter((elem) => {
      return elem.serviceConfigId !== id;
    });
  }

  restoreInitialValues(): void {
    this.serviceForm.setValue({
      serviceName: this.serviceObject.name,
      maxNumberOfTries: this.serviceObject.serviceConfiguration
        .maxNumberOfTries,
      shouldAskForFaceEnroll: this.serviceObject.serviceConfiguration
        .shouldAskForFaceEnroll,
      defaultCountry: this.serviceObject.serviceConfiguration.defaultCountry,
      allowedCountries: this.serviceObject.serviceConfiguration
        .allowedCountries,
      sessionValidityDuration: null, // not in payload?
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

  updateServiceDetails(): void {
    if (!this.serviceSaved) {
      this.serviceSaved = true;
      this.saved.emit(true);
    }
    this.disableEditing();
  }

  saveServiceDetails(): void {
    this.serviceSaved = true;
    this.disableEditing();

    console.log(this.serviceObject);
    const newService: ServiceObject = {
      businessId: this.serviceObject.businessId,
      serviceName: this.serviceForm.get('serviceName').value,
      password: 'blink.ing', // hard-code
      serviceConfiguration: {
        allowedCountries: this.serviceForm.get('allowedCountries').value,
        defaultCountry: this.serviceForm.get('defaultCountry').value,
        maxNumberOfTries: this.serviceForm.get('maxNumberOfTries').value,
        shouldAskForFaceEnroll: this.serviceForm.get('shouldAskForFaceEnroll')
          .value,
        allowedSteps: [this.steptype.ACCOUNT], // hard-code
        serviceType: [ServiceType.ACCOUNT], // hard-code
        sessionTimeValid: this.serviceForm.get('sessionValidityDuration').value,
      },
      apiKey: {
        type: [APIKeyType.INTERNAL], // hard-code
      },
    };
    console.log(newService);
    this.callBroker.addNewService(newService).subscribe((response) => {
      console.log(response);
      this.newService = false;
      this.flags.loading = false;
    });
  }

  onSavedServiceForm(saved: boolean): void {
    /*
    if (saved) {
      this.savedServiceConfigForms++;
    }
  */
  }
}
