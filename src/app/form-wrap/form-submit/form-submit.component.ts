import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceObject } from 'src/app/shared/models/service-object.model';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
})
export class FormSubmitComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormSubmitComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { formObject: ServiceObject; id: string }
  ) {
    console.log(data);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
