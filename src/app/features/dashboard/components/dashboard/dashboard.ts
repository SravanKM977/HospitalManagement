import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { HoverShadowDirective } from '../../../../shared/directives/hover-shadow-directive';
import { PatientService } from '../../../patients/services/patient.service';
import { Observable, shareReplay } from 'rxjs';
import { Patient } from '../../../patients/models/patients.interface';
import { Doctors } from '../../../doctors/components/doctors/doctors';
import { DoctorService } from '../../../doctors/services/doctor-service';
import { Doctor } from '../../../doctors/models/doctors.interface';
import { AppointmentService } from '../../../appointments/services/appointment-service';
import { Appointment } from '../../../appointments/models/appointments.interface';
import { AsyncPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HospitalChart } from '../../../../shared/components/chart/hospital-chart';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [Card, HoverShadowDirective, AsyncPipe, HospitalChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  patients$!: Observable<Patient[]>;
  doctors$!: Observable<Doctor[]>;
  appointments$!: Observable<Appointment[]>;

  @ViewChild('patientsChart')
  patientsChart!: ElementRef;

  @ViewChild('appointmentChart')
  appointmentChart!: ElementRef;

  @ViewChild('billingChart')
  billingChart!: ElementRef;

  bloodGroupCount: number = 0;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.patients$ = this.patientService.getPatients().pipe(shareReplay(1));
    this.patients$.subscribe((patients) => {
      this.bloodGroupCount = patients.filter((p) => p.bloodGroup === '').length;
    });
    this.doctors$ = this.doctorService.getDoctors().pipe(shareReplay(1));
    this.appointments$ = this.appointmentService.getAppointments().pipe(shareReplay(1));
  }

  ngAfterViewInit(): void {
    this.createPatientsChart();
    this.createAppointmentChart();
    this.createBillingChart();
  }

  createPatientsChart() {
    new Chart(this.patientsChart.nativeElement, {
      type: 'bar',

      data: {
        labels: ['Cardiology', 'Neurology', 'Orthopedic', 'Pediatrics'],

        datasets: [
          {
            label: 'Patients',

            data: [this.bloodGroupCount, 15, 10, 20],
          },
        ],
      },
    });
  }

  createAppointmentChart() {
    new Chart(this.appointmentChart.nativeElement, {
      type: 'pie',

      data: {
        labels: ['Scheduled', 'Completed', 'Cancelled'],

        datasets: [
          {
            data: [35, 80, 10],
          },
        ],
      },
    });
  }

  createBillingChart() {
    new Chart(this.billingChart.nativeElement, {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],

        datasets: [
          {
            label: 'Revenue',

            data: [5000, 6500, 7200, 8000],
          },
        ],
      },
    });
  }
}
