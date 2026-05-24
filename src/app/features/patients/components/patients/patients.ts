import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patients.interface';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, AsyncPipe],
  providers: [PatientService],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {
  patients$!: Observable<Patient[]>;
  patientName = '';

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients$ = this.patientService.getPatients();

    this.patients$.subscribe((response) => {
      console.log(response);
      // this.patientName = response.firstName + response.lastName;
    });
  }

  submit() {}
}
