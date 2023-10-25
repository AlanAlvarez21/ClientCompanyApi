import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  leader: any = {};
  employees: any[] = [];
  departmentId: string | null = null;
  companyId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('companyId');
      this.departmentId = params.get('departmentId');
      this.getEmployeesData();
    });
  }

  getEmployeesData(): void {
    if (this.departmentId) {
      const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/departments/${this.departmentId}/employees-leaders`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.leader = data.leader;
        this.employees = data.employees;
      });
    }
  }

  returnToDepartment(): void {
    this.router.navigate(['/departments', this.companyId]);
  }

  deleteEmployee(employeeId: string): void {
    const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/employees/${employeeId}`;
    this.http.delete(apiUrl).subscribe(() => {
      this.employees = this.employees.filter(employee => employee._id !== employeeId);
    });
  }

  getUser(id: string): void {

    console.log('hola mundo :D')
    const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/departments/company/${this.companyId}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // Navegar a la vista de departamentos con el companyId como parámetro
      this.router.navigate(['/edit-employee', this.companyId,  this.departmentId ]);
    });
  }
}