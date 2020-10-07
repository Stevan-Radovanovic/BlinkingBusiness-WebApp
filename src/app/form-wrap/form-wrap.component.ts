import { Component, OnInit } from '@angular/core';
import { Country } from '../shared/models/country.model';
import { ServiceObject } from '../shared/models/service-object.model';
import { StepType } from '../shared/models/step-type.model';
import { v4 as uuidv4 } from 'uuid';
import { SubType } from '../shared/models/sub-type.model';
import { BusinessObject } from '../shared/models/business-object.model';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms: ServiceObject[] = [];
  businessObject: BusinessObject = {
    businessName: '',
    primaryColor: '',
    businessUrl: '',
  };
  expandServicePanels = false;
  savedServiceForms = 0;

  constructor() {}

  addNewServiceForm() {
    const newService = {
      serviceId: uuidv4(),
      serviceName: '',
      shouldAskForFaceEnroll: true,
      defaultCountry: null,
      allowedCountries: [],
      maxNumberOfTries: null,
      sessionValidity: null,
    };
    this.serviceForms.push(newService);
    this.expandServicePanels = true;
    console.log(this.serviceForms);
  }

  onDeleteService(id: string) {
    console.log(id);

    console.log(
      (this.serviceForms = this.serviceForms.filter((elem) => {
        return elem.serviceId !== id;
      }))
    );

    this.serviceForms;
  }

  ngOnInit(): void {
    this.businessObject = {
      businessName: 'Granice Mlekara',
      businessUrl: 'www.granice.com',
      primaryColor: '#aaaede',
    };

    this.serviceForms = [
      {
        serviceId: '1',
        serviceName: 'Servis1',
        shouldAskForFaceEnroll: true,
        defaultCountry: Country.GBR,
        allowedCountries: [Country.GBR, Country.SRB],
        maxNumberOfTries: 3,
        sessionValidity: 120,
        serviceConfigs: [
          {
            serviceConfigId: '1',
            baseRedirectUrl: 'www.blinking.id',
            defaultCountry: Country.GBR,
            blinkingParams: ['Status'],
            maxNumberOfTries: 3,
            shouldAskForFaceEnroll: true,
            initialSessionConfig: [StepType.ACCOUNT, StepType.CONTACT],
            serviceConfigName: 'Config1',
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
            serviceConfigName: 'Config2',
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
        serviceId: '2',
        serviceName: 'Servis2',
        shouldAskForFaceEnroll: true,
        defaultCountry: Country.SRB,
        allowedCountries: [Country.MNE, Country.SRB],
        maxNumberOfTries: 2,
        sessionValidity: 121,
      },
    ];
  }

  onSavedServiceForm(saved: boolean) {
    if (saved) {
      this.savedServiceForms++;
    }
  }
}
