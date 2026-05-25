import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { map, Observable } from 'rxjs';
import { Patient } from '../../models/patients.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStyleDirective } from '../../../../shared/directives/form-style-directive';
import { FormInputFontDirective } from '../../../../shared/directives/form-input-font-directive';
import { TextHighlight } from '../../../../shared/directives/text-highlight.directive';
import { NoAlphabetsDirective } from '../../../../shared/directives/no-alphabets-directive';
import { AlphabetsOnlyDirective } from '../../../../shared/directives/alphabets-only-directive';
import { Gender } from '../../../../shared/models/gender.interface';
import { BloodGroup } from '../../../../shared/models/bloodGroup.interface';
import { AllPhoneFormatsPipe } from '../../../../shared/pipes/all-phone-formats-pipe';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { PageTableTitle } from '../../../../shared/components/page-table-title/page-table-title';

@Component({
  selector: 'app-patients',
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    FormStyleDirective,
    FormInputFontDirective,
    TextHighlight,
    NoAlphabetsDirective,
    AlphabetsOnlyDirective,
    AllPhoneFormatsPipe,
    PageTitle,
    PageTableTitle,
  ],
  providers: [PatientService],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {
  pageTitle: string = 'Patients';
  pageTableTitle = 'Patients List';
  patients$!: Observable<Patient[]>;

  patientForm!: FormGroup;
  mode = 'add';

  genders: Gender[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  bloodGroups: BloodGroup[] = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  constructor(private patientService: PatientService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializePatientForm();
    this.loadPatients();
  }

  initializePatientForm() {
    this.patientForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.maxLength(3)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      bloodGroup: ['', Validators.required],
    });
  }

  loadPatients() {
    this.patients$ = this.patientService.getPatients().pipe(
      map((patients) =>
        patients.map((patient) => ({
          ...patient,
          fullName: `${patient.firstName} ${patient.lastName}`,
        }))
      )
    );
    this.patientForm.clearValidators();
  }

  get patientFirstName() {
    return this.patientForm.get('firstName');
  }

  get patientLastName() {
    return this.patientForm.get('lastName');
  }

  get patientAge() {
    return this.patientForm.get('age');
  }

  get patientGender() {
    return this.patientForm.get('gender');
  }

  get patientPhone() {
    return this.patientForm.get('phone');
  }
  get patientBloodGroup() {
    return this.patientForm.get('bloodGroup');
  }

  onCancel() {
    this.mode = 'add';
    this.patientForm.reset();
  }

  onEdit(patient: Patient) {
    this.patientForm.markAllAsTouched();
    this.mode = 'edit';
    this.patientForm.patchValue(patient);
  }

  onDelete(patient: Patient) {
    if (confirm('Are you sure you want to delete?')) {
      this.patientService.deletePatients(patient).subscribe(
        (response) => {
          this.loadPatients();
        },
        (error) => {
          console.error('Error Deleting the Patient', patient);
        }
      );
    } else {
      return;
    }
  }

  submit() {
    if (this.patientForm.invalid) {
      console.error('Form is invalid. Please correct the errors and try again.');
      return;
    } else if (this.patientForm.valid) {
      if (this.mode === 'add') {
        const newPatient = this.patientForm.value;
        this.patientService.addPatients(newPatient).subscribe(
          (response) => {
            alert('Patient added successfully');
            this.loadPatients();
            this.patientForm.reset();
          },
          (error) => {
            console.error('Error adding Patient', error);
          }
        );
      } else if (this.mode === 'edit') {
        const updatePatient = this.patientForm.value;
        this.patientService.updatePatients(updatePatient).subscribe(
          (response) => {
            this.mode = 'add';
            this.loadPatients();
            this.patientForm.reset();
          },
          (error) => {
            console.error('Error updating patient', error);
          }
        );
      }
    }
  }
}
