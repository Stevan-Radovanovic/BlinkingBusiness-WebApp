import { Component, OnInit } from '@angular/core';
import { Country } from '../shared/models/country.model';
import { ServiceObject } from '../shared/models/service-object.model';
import { StepType } from '../shared/models/step-type.model';
import { v4 as uuidv4 } from 'uuid';
import { SubType } from '../shared/models/sub-type.model';
import { BusinessObject } from '../shared/models/business-object.model';
import { CallBrokerService } from '../shared/services/call-broker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms: ServiceObject[] = [];

  businessObject: BusinessObject;

  expandServicePanels = false;
  savedServiceForms = 0;

  constructor(
    private callBroker: CallBrokerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.callBroker.getBusinessById(id).subscribe((response) => {
      this.businessObject = response.payload;
      this.serviceForms = this.businessObject.services;
    });
  }

  mockFillProperties() {
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
          sessionValidity: 120,
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
          sessionValidity: 121,
        },
      },
    ];
  }

  addNewServiceForm() {
    const newService = {
      id: uuidv4(),
      name: '',
      serviceConfiguration: {
        shouldAskForFaceEnroll: false,
        defaultCountry: null,
        allowedCountries: [],
        maxNumberOfTries: null,
        sessionValidity: null,
      },
    };
    this.serviceForms.push(newService);
    this.expandServicePanels = true;
  }

  onDeleteService(id: number) {
    this.serviceForms = this.serviceForms.filter((elem) => {
      return elem.id !== id;
    });

    this.serviceForms;
  }

  onSavedServiceForm(saved: boolean) {
    if (saved) {
      this.savedServiceForms++;
    }
  }
}
