import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditionalDoc } from 'src/app/shared/models/additional-doc.model';
import { SubType } from 'src/app/shared/models/sub-type.model';

@Component({
  selector: 'app-edit-additional-doc',
  templateUrl: './edit-additional-doc.component.html',
  styleUrls: ['./edit-additional-doc.component.css'],
})
export class EditAdditionalDocComponent implements OnInit {
  docForm: FormGroup;
  subtype = SubType;
  @ViewChild('description') additionalDocDesc: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.initUserForm();

    this.docForm.get('subtype').valueChanges.subscribe((value: string) => {
      switch (value) {
        case this.subtype.DOCUMENT_COPY: {
          this.docForm.patchValue({
            description: this.subtype.DOCUMENT_COPY,
          });
          this.additionalDocDesc.nativeElement.disabled = true;
          break;
        }
        case this.subtype.PROOF_OF_ADDRESS: {
          this.docForm.patchValue({
            description: this.subtype.PROOF_OF_ADDRESS,
          });
          this.additionalDocDesc.nativeElement.disabled = true;
          break;
        }
        case this.subtype.PROOF_OF_INCOME: {
          this.docForm.patchValue({
            description: this.subtype.PROOF_OF_INCOME,
          });
          this.additionalDocDesc.nativeElement.disabled = true;
          break;
        }
        case this.subtype.OTHER: {
          this.docForm.patchValue({
            description: '',
          });
          this.additionalDocDesc.nativeElement.disabled = false;
          break;
        }
      }
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { doc: AdditionalDoc },
    public dialogRef: MatDialogRef<EditAdditionalDocComponent>
  ) {}

  requiredValidator(controlName: string) {
    return (
      this.docForm.get(controlName).hasError('required') &&
      this.docForm.get(controlName).touched
    );
  }

  initUserForm() {
    this.docForm = new FormGroup({
      subtype: new FormControl(this.data.doc.subType, Validators.required),
      description: new FormControl(
        this.data.doc.description,
        Validators.required
      ),
    });
  }

  updateAdditionalDoc() {
    const updatedAdditional: AdditionalDoc = {
      id: this.data.doc.id,
      subType: this.docForm.get('subtype').value,
      description: this.docForm.get('description').value,
    };
    console.log('Updated Additional', updatedAdditional);
    this.dialogRef.close(updatedAdditional);
  }
}
