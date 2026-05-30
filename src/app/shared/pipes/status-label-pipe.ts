import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true,
})
export class StatusLabelPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) {
      return '';
    }

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }
}
