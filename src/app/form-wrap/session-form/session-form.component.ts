import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css'],
})
export class SessionFormComponent implements OnInit {
  @Input() sessionForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.sessionForm
      .get('initialSessionConfig')
      .valueChanges.subscribe((value: string[]) => {
        if (value.includes('Back Side') && value.includes('Front Side')) {
        } else if (value.includes('Back Side')) {
          value.push('Front Side');
        } else if (value.includes('Front Side')) {
          value.push('Back Side');
        } else if (!value.includes('Back Side')) {
          value = value.filter((elem) => elem !== 'Front Side');
        } else if (!value.includes('Front Side')) {
          value = value.filter((elem) => elem !== 'Back Side');
        }

        if (value.includes('Document')) {
          value = value.filter((elem) => elem !== 'Document with Country');
        } else if (value.includes('Document with Country')) {
          value = value.filter((elem) => elem !== 'Document');
        }

        console.log(value);
      });
  }
}
