import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


const routes: Routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'companies', component: CompanyListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-department/:companyId', component: AddDepartmentComponent },
  { path: 'edit-department/:companyId/:departmentId', component: EditDepartmentComponent },
  { path: 'departments/:companyId', component: DepartmentsComponent },
  { path: 'employees/:departmentId/:companyId', component: EmployeesComponent },
  { path: 'edit-employee/:companyId/:departmentId', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
