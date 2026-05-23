import { Appointment } from '../../appointments/models/appointments.interface';

export interface Billing {
  id: number;

  appointmentId: number;

  consultationFee: number;
  medicineFee: number;
  roomFee: number;
  totalAmount: number;

  paymentStatus: 'Paid' | 'Pending';

  appointment?: Appointment;
}
