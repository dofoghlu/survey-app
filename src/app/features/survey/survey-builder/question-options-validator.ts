
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function questionOptionsValidator(control: AbstractControl): ValidationErrors | null {
  const text = control.value || '';
  const lines = text.split('\n').map((line: string) => line.trim()).filter((line: string) => line !== '');

  const invalidLines = lines.filter((line: string) => !line.startsWith('-') || line.length <= 1);
  
  if (invalidLines.length > 0) {
    return { invalidLines: true, message: 'All lines must start with "-" and have at least 1 character after.' };
  }

  const validLines = lines.filter((line: string) => line.startsWith('-') && line.length > 1);

  if (validLines.length < 2) {
    return { insufficientOptions: true, message: 'At least 2 options are required.' };
  }

  return null;
}

