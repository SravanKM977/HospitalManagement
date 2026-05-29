import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../../../features/patients/models/patients.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientStateService {
  constructor() {}

  selectedPatient$ = new BehaviorSubject<Patient | null>(null) as any;
}
