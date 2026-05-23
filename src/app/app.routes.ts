import { Routes } from '@angular/router';
import { MainLayout } from './layout/components/main-layout/main-layout';
import { Dashboard } from './features/dashboard/components/dashboard/dashboard';
import { Patients } from './features/patients/components/patients/patients';
import { Doctors } from './features/doctors/components/doctors/doctors';
import { Departments } from './features/departments/components/departments/departments';
import { Appointments } from './features/appointments/components/appointments/appointments';
import { Billing } from './features/billing/components/billing/billing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/layout',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'patients',
        component: Patients,
      },
      {
        path: 'doctors',
        component: Doctors,
      },
      {
        path: 'departments',
        component: Departments,
      },
      {
        path: 'appointments',
        component: Appointments,
      },
      {
        path: 'billing',
        component: Billing,
      },
    ],
  },
];
