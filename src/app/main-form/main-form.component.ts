import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  businessForm: FormGroup;
  sessionForm: FormGroup;

  constructor() {}

  initBusinessForm() {
    this.businessForm = new FormGroup({
      color: new FormControl('', [Validators.required]),
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

  ngOnInit(): void {
    this.initBusinessForm();
    this.initSessionForm();
  }
}
