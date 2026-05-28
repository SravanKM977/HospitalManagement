import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoints } from '../../../../assets/constants/apiEndPoint.constant';
import { Appointment } from '../models/appointments.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<Appointment[]>(`${apiEndPoints.appointments}`);
  }

  addAppointments(appointment: Appointment) {
    return this.http.post(`${apiEndPoints.appointments}`, appointment);
  }

  updateAppointments(appointment: Appointment) {
    return this.http.put(`${apiEndPoints.appointments}/${appointment.id}`, appointment);
  }

  deleteAppointments(appointment: Appointment) {
    console.log(appointment);
    return this.http.delete(`${apiEndPoints.appointments}/${appointment.id}`);
  }
}
