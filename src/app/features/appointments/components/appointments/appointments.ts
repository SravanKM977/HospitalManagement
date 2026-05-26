import { Component } from '@angular/core';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { PageTableTitle } from '../../../../shared/components/page-table-title/page-table-title';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointments.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { Doctor } from '../../../doctors/models/doctors.interface';
import { Patient } from '../../../patients/models/patients.interface';
import { Department } from '../../../departments/models/departments.interface';
import { PatientService } from '../../../patients/services/patient.service';
import { DoctorService } from '../../../doctors/services/doctor-service';
import { DepartmentService } from '../../../departments/services/department-service';

@Component({
  selector: 'app-appointments',
  imports: [PageTitle, PageTableTitle, CommonModule, ReactiveFormsModule, AsyncPipe],
  providers: [AppointmentService, PatientService, DoctorService, DepartmentService],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments {
  pageTitle = 'Appointments';
  pageTableTitle = 'Appointments List';

  appointmentForm!: FormGroup;
  appointments$!: Observable<Appointment[]>;
  patients$!: Observable<Patient[]>;
  doctors$!: Observable<Doctor[]>;
  departments$!: Observable<Department[]>;

  mappedAppointments$!: Observable<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.appointments$ = this.appointmentService.getAppointments();
    this.patients$ = this.patientService.getPatients();
    this.doctors$ = this.doctorService.getDoctors();
    this.departments$ = this.departmentService.getDepartments();

    this.mappedAppointments$ = combineLatest([
      this.appointments$,
      this.patients$,
      this.doctors$,
      this.departments$,
    ]).pipe(
      map(([appointments, patients, doctors, departments]) => {
        console.log('inside pipe');
        return appointments.map((appointment) => {
          console.log(appointment, patients, doctors);
          const patient = patients.find((patient) => patient.id == appointment.patientId);
          console.log(patient);

          const doctor = doctors.find((doctor) => doctor.id == appointment.doctorId);
          console.log(doctor);

          const department = departments.find(
            (department) => department.id == doctor?.departmentId
          );

          return {
            ...appointment,
            patient,
            doctor: doctor
              ? {
                  ...doctor,
                  department,
                }
              : undefined,
          };
        });
      })
    );
  }
}
