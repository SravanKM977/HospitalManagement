import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allPhoneFormats',
})
export class AllPhoneFormatsPipe implements PipeTransform {
  transform(value: string | number, format: string = 'default'): string {
    if (!value) return '';

    const cleaned = value.toString().replace(/\D/g, '');

    if (cleaned.length !== 10) {
      return value.toString(); // Return original if not 10 digits
    }

    const area = cleaned.substring(0, 3);
    const middle = cleaned.substring(3, 6);
    const last = cleaned.substring(6, 10);

    switch (format) {
      case 'dashes': {
        return `${area}-${middle}-${last}`;
      }

      case 'dots': {
        return `${area}.${middle}.${last}`;
      }

      case 'spaces': {
        return `${area} ${middle} ${last}`;
      }

      case 'international': {
        return `+1 (${area}) ${middle}-${last}`;
      }

      default: {
        return `(${area}) ${middle}-${last}`;
      }
    }
  }
}
