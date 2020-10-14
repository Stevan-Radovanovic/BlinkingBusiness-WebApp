import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBarMessage(message: string): any {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.panelClass = 'snackbar';
    this.snackBar.open(message, 'Close', config);
  }

  hideSnackBar(): any {
    this.snackBar.dismiss();
  }
}
