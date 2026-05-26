import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor-service';
import { Doctor } from '../../models/doctors.interface';
import { map, Observable } from 'rxjs';
import { Department } from '../../../departments/models/departments.interface';
import { DepartmentService } from '../../../departments/services/department-service';
import { FormStyleDirective } from '../../../../shared/directives/form-style-directive';
import { FormInputFontDirective } from '../../../../shared/directives/form-input-font-directive';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { PageTableTitle } from '../../../../shared/components/page-table-title/page-table-title';

@Component({
  selector: 'app-doctors',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormStyleDirective,
    FormInputFontDirective,
    PageTitle,
    PageTableTitle,
  ],
  providers: [DoctorService, DepartmentService],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {
  pageTitle = 'Doctors';
  pageTableTitle = 'Doctors List';
  doctors$!: Observable<Doctor[]>;
  mode = 'add';

  doctorForm!: FormGroup;
  departments$!: Observable<Department[]>;
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.initializeDoctorForm();
    this.loadDepartments();
  }

  initializeDoctorForm() {
    this.doctorForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
    });
  }

  loadDepartments() {
    this.departments$ = this.departmentService.getDepartments();
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      console.log(departments);
      this.loadDoctors();
    });
  }

  loadDoctors() {
    this.doctors$ = this.doctorService.getDoctors().pipe(
      map((doctors) =>
        doctors.map((doctor) => ({
          ...doctor,
          department: this.departments.find((d) => d.id == doctor.departmentId),
        }))
      )
    );
  }

  onEdit(doctor: Doctor) {
    this.mode = 'edit';
    this.doctorForm.patchValue(doctor);
  }

  onDelete(doctor: Doctor) {
    if (confirm('Are you sure you want to delete?')) {
      const deleteDoctor = doctor;
      this.doctorService.deleteDoctors(deleteDoctor).subscribe(
        (response) => {
          this.loadDoctors();
        },
        (error) => {
          console.error('Error deleting the Doctor', error);
        }
      );
    }
  }

  onCancel() {
    this.mode = 'add';
    this.doctorForm.reset();
  }

  Submit() {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      console.error('Form is Invalid, please fill out the fields properly');
      return;
    } else {
      if (this.mode === 'add') {
        const newDoctor = this.doctorForm.value;
        this.doctorService.addDoctors(newDoctor).subscribe(
          (response) => {
            console.log(response);
            this.loadDoctors();
            this.doctorForm.reset();
          },
          (error) => {
            console.error('Error adding Doctor', error);
          }
        );
      } else if (this.mode === 'edit') {
        const updateDoctor = this.doctorForm.value;
        this.doctorService.updateDoctors(updateDoctor).subscribe(
          () => {
            this.mode = 'add';
            this.loadDoctors();
            this.doctorForm.reset();
          },
          (error) => {
            console.error('Error updating Doctor', error);
          }
        );
      }
    }
  }
}
