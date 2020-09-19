import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FormObject } from '../shared/form-object.model';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.css'],
})
export class FormWrapComponent implements OnInit {
  businessForm: FormGroup;
  sessionForm: FormGroup;

  constructor() {}

  initBusinessForm() {
    this.businessForm = new FormGroup({
      color: new FormControl('', [
        Validators.required,
        Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
      ]),
      favicon: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
    });
  }

  initSessionForm() {
    this.sessionForm = new FormGroup({
      baseRedirectUrl: new FormControl('', [Validators.required]),
      blinkingParams: new FormControl('', [Validators.required]),
      willEmbedInIframe: new FormControl(false),
      skippableSteps: new FormControl([]),
      stepsThatRequireProofOfDocuments: new FormControl([]),
      initialSessionConfig: new FormControl('', [Validators.required]),
      stepsThatRequireAttention: new FormControl([], [Validators.required]),
    });
  }

  submit() {
    const formObject: FormObject = {
      baseRedirectUrl: this.sessionForm.controls.baseRedirectUrl.value,
      blinkingParams: this.sessionForm.controls.blinkingParams.value,
      serviceConfiguration: {
        skippableSteps: this.sessionForm.controls.skippableSteps.value,
        stepsThatRequireAttention: this.sessionForm.controls
          .stepsThatRequireAttention.value,
        stepsThatRequireProofOfDocuments: this.sessionForm.controls
          .stepsThatRequireProofOfDocuments.value,
        initialSessionConfig: this.sessionForm.controls.initialSessionConfig
          .value,
      },
    };
    console.log(formObject);
  }

  ngOnInit(): void {
    this.initSessionForm();
    this.initBusinessForm();
  }
}
