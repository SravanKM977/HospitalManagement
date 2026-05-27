import { Component } from '@angular/core';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { PageTableTitle } from '../../../../shared/components/page-table-title/page-table-title';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointments.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { Doctor } from '../../../doctors/models/doctors.interface';
import { Patient } from '../../../patients/models/patients.interface';
import { Department } from '../../../departments/models/departments.interface';
import { PatientService } from '../../../patients/services/patient.service';
import { DoctorService } from '../../../doctors/services/doctor-service';
import { DepartmentService } from '../../../departments/services/department-service';
import { FormInputFontDirective } from '../../../../shared/directives/form-input-font-directive';
import { FormStyleDirective } from '../../../../shared/directives/form-style-directive';

@Component({
  selector: 'app-appointments',
  imports: [
    PageTitle,
    PageTableTitle,
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormInputFontDirective,
    FormStyleDirective,
  ],
  providers: [AppointmentService, PatientService, DoctorService, DepartmentService],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments {
  pageTitle = 'Appointments';
  pageTableTitle = 'Appointments List';
  mode = 'add';

  appointmentForm!: FormGroup;
  appointments$!: Observable<Appointment[]>;
  patients$!: Observable<Patient[]>;
  doctors$!: Observable<Doctor[]>;
  departments$!: Observable<Department[]>;

  mappedAppointments$!: Observable<Appointment[]>;
  statuses = ['Scheduled', 'Completed', 'Cancelled'];

  errorMessage = '';

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeAppointmentForm();
    this.callAppointments();
  }

  initializeAppointmentForm() {
    this.appointmentForm = this.fb.group({
      id: [''],
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  callAppointments() {
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
        return appointments.map((appointment) => {
          const patient = patients.find((patient) => patient.id == appointment.patientId);

          const doctor = doctors.find((doctor) => doctor.id == appointment.doctorId);

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

  onCancel() {
    this.mode = 'add';
    this.appointmentForm.markAsUntouched();
    this.appointmentForm.reset();
  }

  onEdit(appointment: Appointment) {
    this.mode = 'edit';
    this.appointmentForm.patchValue(appointment);
  }

  getErrorMessage(error: Error) {
    return (this.errorMessage = error.message);
  }

  onDelete(appointment: Appointment) {
    if (appointment && confirm('Are you sure you want to delete?')) {
      this.deleteAppointments();
    } else {
      return;
    }
  }

  submit() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    } else if (this.appointmentForm.valid) {
      if ((this.mode = 'add')) {
        this.addAppointments();
      } else if ((this.mode = 'edit')) {
        this.updateAppointments();
      }
    }
  }

  addAppointments() {
    const newAppointment = this.appointmentForm.value;
    this.appointmentService.addAppointments(newAppointment).subscribe(
      (response) => {
        this.appointmentForm.reset({
          status: 'Scheduled',
        });
      },
      (error) => {
        this.getErrorMessage(error);
      }
    );
  }

  updateAppointments() {
    const updatedAppointment = this.appointmentForm.value;
    this.appointmentService.updateAppointments(updatedAppointment).subscribe(
      (response) => {
        if (response) {
          this.callAppointments();
          this.appointmentForm.reset({ status: 'Scheduled' });
          this.mode = 'add';
        }
      },
      (error) => {
        this.getErrorMessage(error);
      }
    );
  }

  deleteAppointments() {
    const deleteAppointment = this.appointmentForm.value;
    console.log(deleteAppointment);
    this.appointmentService.deleteAppointments(deleteAppointment).subscribe(
      (response) => {
        this.callAppointments();
      },
      (error) => {
        this.getErrorMessage(error);
      }
    );
  }
}
