import { Component, OnInit } from '@angular/core';
import { Country } from '../shared/models/country.model';
import { ServiceObject } from '../shared/models/service-object.model';
import { StepType } from '../shared/models/enums/step-type.model';
import { v4 as uuidv4 } from 'uuid';
import { SubType } from '../shared/models/enums/sub-type.model';
import { BusinessObject } from '../shared/models/business-object.model';
import { CallBrokerService } from '../shared/services/call-broker.service';
import { ActivatedRoute } from '@angular/router';
import { FlagsService } from '../shared/services/flags.service';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms: ServiceObject[] = [];

  businessObject: BusinessObject;

  expandServicePanels: boolean[] = [];
  savedServiceForms = 0;

  constructor(
    private callBroker: CallBrokerService,
    private route: ActivatedRoute,
    public flags: FlagsService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id === 0) {
      this.businessObject = {
        name: '',
        businessUrl: '',
        businessConfiguration: { primaryColor: '' },
        services: [],
      };
      this.serviceForms = [];
      this.flags.newBusiness = true;
      this.flags.businessConfigCreated = false;
      return;
    }

    this.callBroker.getBusinessById(id).subscribe((response) => {
      this.businessObject = response;
      this.flags.businessConfigCreated = true;
      this.flags.newBusiness = false;
      this.serviceForms = this.businessObject.services;
      this.serviceForms.forEach((form) => {
        form.businessId = this.businessObject.id;
        this.expandServicePanels.push(false);
      });
      this.flags.loading = false;
    });
  }

  mockFillProperties(): void {
    this.businessObject = {
      name: 'Granice Mlekara',
      businessUrl: 'www.granice.com',
      businessConfiguration: {
        primaryColor: '#aaaede',
      },
    };

    this.serviceForms = [
      {
        id: 1,
        name: 'Servis1',
        serviceConfiguration: {
          shouldAskForFaceEnroll: true,
          defaultCountry: Country.GBR,
          allowedCountries: [Country.GBR, Country.SRB],
          maxNumberOfTries: 3,
          sessionTimeValid: 120,
        },
        serviceConfigs: [
          {
            serviceConfigId: '1',
            baseRedirectUrl: 'www.blinking.id',
            defaultCountry: Country.GBR,
            blinkingParams: ['Status'],
            maxNumberOfTries: 3,
            shouldAskForFaceEnroll: true,
            initialSessionConfig: [StepType.ACCOUNT, StepType.CONTACT],
            name: 'Config1',
            willEmbedInIframe: true,
          },
          {
            serviceConfigId: '2',
            baseRedirectUrl: 'www.proudsource.it',
            defaultCountry: Country.SRB,
            blinkingParams: ['Status'],
            maxNumberOfTries: 1,
            shouldAskForFaceEnroll: false,
            initialSessionConfig: [
              StepType.ACCOUNT,
              StepType.CONTACT,
              StepType.ADDITIONAL,
            ],
            name: 'Config2',
            willEmbedInIframe: false,
            additionalDocuments: [
              { subType: SubType.OTHER, description: 'Blinkingcina' },
              {
                subType: SubType.DOCUMENT_COPY,
                description: SubType.DOCUMENT_COPY,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Servis2',
        serviceConfiguration: {
          shouldAskForFaceEnroll: true,
          defaultCountry: Country.SRB,
          allowedCountries: [Country.MNE, Country.SRB],
          maxNumberOfTries: 2,
          sessionTimeValid: 121,
        },
      },
    ];
  }

  addNewServiceForm(): void {
    const newService = {
      id: Math.random() + Math.random() * Math.random(),
      name: '',
      serviceConfiguration: {
        shouldAskForFaceEnroll: false,
        defaultCountry: null,
        allowedCountries: [],
        maxNumberOfTries: null,
        sessionTimeValid: null,
      },
    };
    this.serviceForms.push(newService);
    this.expandServicePanels.push(true);
  }

  onDeleteService(id: number): void {
    this.serviceForms = this.serviceForms.filter((elem) => {
      return elem.id !== id;
    });
  }

  onSavedServiceForm(saved: boolean): void {
    if (saved) {
      this.savedServiceForms++;
    }
  }
}
