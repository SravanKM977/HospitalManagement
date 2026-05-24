import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patients.interface';
import { apiEndPoints } from '../../../../assets/constants/apiEndPoint.constant';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<Patient[]>(`${apiEndPoints.patients}`);
  }

  addPatients(patient: Patient) {
    return this.http.post<Patient[]>(`${apiEndPoints.patients}`, patient);
  }

  updatePatients(patient: Patient) {
    return this.http.put<Patient[]>(`${apiEndPoints.patients}/${patient.id}`, patient);
  }

  deletePatients(patient: Patient) {
    return this.http.delete<Patient[]>(`${apiEndPoints.patients}/${patient.id}`);
  }
}
