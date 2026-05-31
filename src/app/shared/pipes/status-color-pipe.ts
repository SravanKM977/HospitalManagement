import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) {
      return '';
    }

    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-success';

      case 'scheduled':
        return 'text-primary';

      case 'cancelled':
        return 'text-danger';

      default:
        return '';
    }
  }
}
