import { FormControl } from '@angular/forms';

export function frontBack(control: FormControl): { [s: string]: boolean } {
  if (control.value === null) {
    return null;
  }

  if (
    (!control.value.includes('Front side') ||
      !control.value.includes('Back side')) &&
    control.value.includes('Document type')
  ) {
    return { frontBack: true };
  }
  if (
    (!control.value.includes('Front side') ||
      !control.value.includes('Back side')) &&
    control.value.includes('Document type with country')
  ) {
    return { frontBack: true };
  }
  return null;
}
