import { Component, Input, OnInit } from '@angular/core';
import { AdditionalDoc } from 'src/app/shared/models/additional-doc.model';

@Component({
  selector: 'app-additional-docs',
  templateUrl: './additional-docs.component.html',
  styleUrls: ['./additional-docs.component.css'],
})
export class AdditionalDocsComponent implements OnInit {
  @Input() additionalDocs: AdditionalDoc[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.additionalDocs);
  }
}
