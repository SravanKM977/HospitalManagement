import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/departments.interface';
import { apiEndPoints } from '../../../../assets/constants/apiEndPoint.constant';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<Department[]>(`${apiEndPoints.departments}`);
  }

  addDepartments(department: Department) {
    return this.http.post<Department[]>(`${apiEndPoints.departments}`, department);
  }

  updateDepartments(department: Department) {
    return this.http.put<Department[]>(`${apiEndPoints.departments}/${department.id}`, department);
  }

  deleteDepartments(department: Department) {
    return this.http.get<Department[]>(`${apiEndPoints.departments}/${department.id}`);
  }
}
