import { FormControl } from '@angular/forms';

export function frontBack(control: FormControl): { [s: string]: boolean } {
  if (
    control.value.includes('Front Side') &&
    !control.value.includes('Back Side')
  )
    return { frontBack: true };
  if (
    !control.value.includes('Front Side') &&
    control.value.includes('Back Side')
  )
    return { frontBack: true };
  return null;
}
