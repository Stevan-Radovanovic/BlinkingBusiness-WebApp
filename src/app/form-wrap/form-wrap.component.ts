import { Component, OnInit } from '@angular/core';
import { Country } from '../shared/models/country.model';
import { ServiceObject } from '../shared/models/service-object.model';
import { StepType } from '../shared/models/step-type.model';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  serviceForms: ServiceObject[] = [];

  savedServiceForms = 0;

  constructor() {}

  addNewServiceForm() {
    const newService = {
      serviceName: '',
      shouldAskForFaceEnroll: true,
      defaultCountry: null,
      allowedCountries: [],
      maxNumberOfTries: null,
      sessionValidity: null,
    };
    this.serviceForms.push(newService);
    console.log(this.serviceForms);
  }

  onDeleteService(id: string) {
    console.log(id);
    this.serviceForms.filter((elem) => {
      elem.serviceId !== id;
    });
  }

  ngOnInit(): void {
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
