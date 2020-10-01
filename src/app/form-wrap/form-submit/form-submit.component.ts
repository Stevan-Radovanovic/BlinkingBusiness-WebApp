import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceFormObject } from 'src/app/shared/models/service-form-object.model';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
})
export class FormSubmitComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormSubmitComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { formObject: ServiceFormObject; id: string }
  ) {
    console.log(data);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
