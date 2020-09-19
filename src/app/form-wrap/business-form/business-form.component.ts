import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'],
})
export class BusinessFormComponent implements OnInit {
  @Input() businessForm: FormGroup;

  @ViewChild('favicon') favicon: ElementRef<HTMLInputElement>;
  @ViewChild('logo') logo: ElementRef;

  selectedColor = '';

  constructor() {}

  ngOnInit(): void {
    this.selectedColor = '';
    this.businessForm.get('color').valueChanges.subscribe((value) => {
      this.selectedColor = value;
      if (!this.businessForm.get('color').valid) {
        this.selectedColor = '';
      }
    });

    this.businessForm.get('favicon').valueChanges.subscribe((value) => {
      if (this.favicon.nativeElement.files.length === 0) return;
      const fileSize = this.favicon.nativeElement.files[0].size / 1024 / 1024;
      const fileType = this.favicon.nativeElement.files[0].type;

      if (
        fileType !== 'image/png' &&
        fileType !== 'image/jpg' &&
        fileType !== 'image/jpeg' &&
        fileType !== 'image/ico'
      ) {
        this.businessForm.get('favicon').setErrors(new Error('custom'));
      }

      if (fileSize > 3) {
        this.businessForm.get('favicon').setErrors(new Error('custom'));
      }
    });

    this.businessForm.get('logo').valueChanges.subscribe((value) => {
      if (this.logo.nativeElement.files.length === 0) return;
      const fileSize = this.logo.nativeElement.files[0].size / 1024 / 1024;
      const fileType = this.logo.nativeElement.files[0].type;

      if (
        fileType !== 'image/png' &&
        fileType !== 'image/jpg' &&
        fileType !== 'image/jpeg' &&
        fileType !== 'image/ico'
      ) {
        this.businessForm.get('logo').setErrors(new Error('custom'));
      }

      if (fileSize > 3) {
        this.businessForm.get('logo').setErrors(new Error('custom'));
      }
    });
  }
}
