import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormObject } from 'src/app/shared/models/form-object.model';
import { FormSubmitComponent } from '../form-submit/form-submit.component';
import { v4 as uuidv4 } from 'uuid';
import { frontBack } from 'src/app/shared/validators/front-back.validator';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css'],
})
export class SessionFormComponent implements OnInit {
  sessionForm: FormGroup;

  initSessionForm() {
    this.sessionForm = new FormGroup({
      baseRedirectUrl: new FormControl('', [Validators.required]),
      blinkingParams: new FormControl([], [Validators.required]),
      willEmbedInIframe: new FormControl(false),
      skippableSteps: new FormControl([]),
      stepsThatRequireProofOfDocuments: new FormControl([]),
      initialSessionConfig: new FormControl('', [
        Validators.required,
        frontBack,
      ]),
      stepsThatRequireAttention: new FormControl([]),
    });
  }

  submit() {
    const formObject: FormObject = {
      baseRedirectUrl: this.sessionForm.controls.baseRedirectUrl.value,
      blinkingParams: this.sessionForm.controls.blinkingParams.value,
      willEmbedInIframe: this.sessionForm.controls.willEmbedInIframe.value,
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

    const dialogRef = this.dialog.open(FormSubmitComponent, {
      width: '500px',
      data: { formObject, id: uuidv4() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.sessionForm.reset({
        willEmbedInIframe: false,
        skippableSteps: [],
        stepsThatRequireProofOfDocuments: [],
        stepsThatRequireAttention: [],
      });
    });

    console.log(formObject);
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initSessionForm();
  }
}
