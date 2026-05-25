import { Department } from '../../departments/models/departments.interface';

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  departmentId: number;
  department?: Department;
}
