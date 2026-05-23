import { Doctor } from '../../doctors/models/doctors.interface';
import { Patient } from '../../patients/models/patients.interface';

export interface Appointment {
  id: number;

  patientId: number;
  doctorId: number;

  appointmentDate: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';

  patient?: Patient;
  doctor?: Doctor;
}
