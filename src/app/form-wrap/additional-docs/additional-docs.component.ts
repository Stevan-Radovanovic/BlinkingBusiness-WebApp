import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdditionalDoc } from 'src/app/shared/models/additional-doc.model';
import { EditAdditionalDocComponent } from './edit-additional-doc/edit-additional-doc.component';

@Component({
  selector: 'app-additional-docs',
  templateUrl: './additional-docs.component.html',
  styleUrls: ['./additional-docs.component.css'],
})
export class AdditionalDocsComponent implements OnInit {
  @Input() additionalDocs: AdditionalDoc[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  removeAdditionalDoc(i: number): void {
    this.additionalDocs.splice(i, 1);
  }

  editAdditionalDoc(doc: AdditionalDoc): void {
    const dialogRef = this.dialog.open(EditAdditionalDocComponent, {
      data: { doc },
    });

    dialogRef.afterClosed().subscribe((result: AdditionalDoc) => {
      if (result) {
        const index = this.additionalDocs.findIndex((elem) => {
          return elem.id === result.id;
        });
        this.additionalDocs[index] = result;
      }
    });
  }
}
