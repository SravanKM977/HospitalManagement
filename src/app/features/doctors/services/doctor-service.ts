import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoints } from '../../../../assets/constants/apiEndPoint.constant';
import { Doctor } from '../models/doctors.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get<Doctor[]>(`${apiEndPoints.doctors}`);
  }

  addDoctors(doctor: Doctor) {
    return this.http.post<Doctor[]>(`${apiEndPoints.doctors}`, doctor);
  }

  updateDoctors(doctor: Doctor) {
    return this.http.put<Doctor[]>(`${apiEndPoints.doctors}/${doctor.id}`, doctor);
  }

  deleteDoctors(doctor: Doctor) {
    return this.http.delete<Doctor[]>(`${apiEndPoints.doctors}/${doctor.id}`);
  }
}
