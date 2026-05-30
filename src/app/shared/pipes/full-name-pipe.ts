import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(patient: any): string {
    if (!patient) {
      return '';
    }

    return `${patient.firstName} ${patient.lastName}`;
  }
}
