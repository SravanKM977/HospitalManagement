import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PatientStateService } from '../../../../shared/state/services/patient-state.service';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patients.interface';

@Component({
  selector: 'app-patient-details',
  imports: [AsyncPipe],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails implements OnInit {
  @Input() selectedPatient$!: Observable<Patient | null>;

  constructor(private patientStateService: PatientStateService) {}

  ngOnInit() {
    this.selectedPatient$ = this.patientStateService.selectedPatient$;
  }
}
