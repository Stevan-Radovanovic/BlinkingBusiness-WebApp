import { FormControl } from '@angular/forms';

export function file(control: FormControl): { [s: string]: boolean } {
  if (control.value === null) return null;
}
