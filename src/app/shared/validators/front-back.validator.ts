import { FormControl } from '@angular/forms';

export function frontBack(control: FormControl): { [s: string]: boolean } {
  if (control.value === null) {
    return null;
  }

  if (
    (!control.value.includes('FRONT') || !control.value.includes('BACK')) &&
    control.value.includes('DOCUMENT')
  ) {
    return { frontBack: true };
  }
  if (
    (!control.value.includes('FRONT') || !control.value.includes('BACK')) &&
    control.value.includes('COUNTRY')
  ) {
    return { frontBack: true };
  }
  return null;
}
